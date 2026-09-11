"""
Bumblebee Persistent Monitoring Job Scheduler & Health Web Service
Runs continuous intervals for all active monitors and exposes a lightweight HTTP health endpoint
to enable 100% Free Tier Web Service deployment on Render / Railway / Koyeb.
"""

import os
import asyncio
import time
import logging
from typing import List, Dict, Any
from aiohttp import web
from worker import BumblebeeMonitorWorker

logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(name)s: %(message)s')
logger = logging.getLogger("BumblebeeScheduler")

class BumblebeeScheduler:
    def __init__(self, check_interval_sec: int = 30):
        self.check_interval = check_interval_sec
        self.worker = BumblebeeMonitorWorker()
        self.is_running = False

    async def start(self, monitors: List[Dict[str, Any]] = None):
        self.is_running = True
        if monitors is None:
            # Default fallback sample services for independent worker execution
            monitors = [
                {"id": "mon-1", "name": "Production Customer Portal", "url": "https://httpstat.us/200", "interval": 30, "type": "WEBSITE"},
                {"id": "mon-2", "name": "Stripe & Crypto Payment Gateway", "url": "https://httpstat.us/200", "interval": 30, "type": "API"},
                {"id": "mon-3", "name": "Global CDN Edge Anycast", "url": "https://1.1.1.1", "interval": 30, "type": "PING"}
            ]
        
        logger.info(f"🐝 Bumblebee Watchdog Scheduler active. Monitoring {len(monitors)} services every {self.check_interval}s.")
        
        while self.is_running:
            start_loop = time.time()
            tasks = []
            for monitor in monitors:
                if not monitor.get("is_paused", False):
                    tasks.append(self._schedule_single_check(monitor))
            
            if tasks:
                await asyncio.gather(*tasks, return_exceptions=True)
            
            elapsed = time.time() - start_loop
            sleep_time = max(0.1, self.check_interval - elapsed)
            logger.info(f"Watchdog probe cycle completed in {elapsed:.2f}s. Sleeping for {sleep_time:.2f}s...")
            await asyncio.sleep(sleep_time)

    async def _schedule_single_check(self, monitor: Dict[str, Any]):
        try:
            result = await self.worker.execute_http_check(monitor)
            if result.status != "OPERATIONAL":
                await self.worker.verify_and_process_failure(monitor, result)
            else:
                await self.worker.check_recovery(monitor)
        except Exception as e:
            logger.error(f"Error checking monitor {monitor.get('name', 'unknown')}: {e}")

    def stop(self):
        self.is_running = False
        logger.info("Bumblebee Scheduler stopped.")


# ==============================================================================
# AIOHTTP WEB HEALTHCHECK ENDPOINTS (FOR RENDER FREE TIER)
# ==============================================================================

async def handle_health(request):
    return web.json_response({
        "status": "OPERATIONAL",
        "service": "Bumblebee Watchdog Worker",
        "version": "1.0.0",
        "engine": "Async Python 3.11",
        "timestamp": time.time()
    })

async def init_app():
    app = web.Application()
    app.router.add_get("/", handle_health)
    app.router.add_get("/health", handle_health)
    
    # Start background watchdog scheduler concurrently
    scheduler = BumblebeeScheduler(check_interval_sec=30)
    asyncio.create_task(scheduler.start())
    
    return app

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    logger.info(f"🚀 Starting Bumblebee Worker Web Service on port {port}...")
    web.run_app(init_app(), port=port)

