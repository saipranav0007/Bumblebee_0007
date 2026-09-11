"""
Bumblebee Persistent Monitoring Job Scheduler
Runs cron and continuous intervals for all active monitors.
"""

import asyncio
import time
import logging
from typing import List, Dict, Any
from worker import BumblebeeMonitorWorker

logger = logging.getLogger("BumblebeeScheduler")

class BumblebeeScheduler:
    def __init__(self, check_interval_sec: int = 30):
        self.check_interval = check_interval_sec
        self.worker = BumblebeeMonitorWorker()
        self.is_running = False

    async def start(self, monitors: List[Dict[str, Any]]):
        self.is_running = True
        logger.info(f"🐝 Bumblebee Scheduler started. Monitoring {len(monitors)} services every {self.check_interval}s.")
        
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
            logger.info(f"Check cycle completed in {elapsed:.2f}s. Sleeping for {sleep_time:.2f}s...")
            await asyncio.sleep(sleep_time)

    async def _schedule_single_check(self, monitor: Dict[str, Any]):
        try:
            result = await self.worker.execute_http_check(monitor)
            if result.status != "OPERATIONAL":
                await self.worker.verify_and_process_failure(monitor, result)
            else:
                await self.worker.check_recovery(monitor)
        except Exception as e:
            logger.error(f"Error checking monitor {monitor['name']}: {e}")

    def stop(self):
        self.is_running = False
        logger.info("Bumblebee Scheduler stopped.")
