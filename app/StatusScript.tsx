'use client';

import { useEffect } from 'react';

// This runs the EXACT same logic as the original happiwell-homepage.html <script> block,
// unmodified, operating on the DOM elements by id (#status-dot, #status-text, #hours-table,
// #today-hours) that are rendered by page.tsx. This is a verbatim port, not a rewrite,
// so behavior is guaranteed identical to the original static file.
export default function StatusScript() {
  useEffect(() => {
    var schedule: Record<number, { open: number; close: number }> = {
      0: { open: 480, close: 720 },
      1: { open: 480, close: 1080 },
      2: { open: 480, close: 1080 },
      3: { open: 480, close: 1080 },
      4: { open: 480, close: 1080 },
      5: { open: 480, close: 1080 },
      6: { open: 480, close: 720 },
    };

    function minToLabel(m: number) {
      var h = Math.floor(m / 60),
        mm = m % 60;
      return (h < 10 ? '0' : '') + h + ':' + (mm < 10 ? '0' : '') + mm;
    }

    function bangkokNow() {
      return new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }));
    }

    function update() {
      var now = bangkokNow();
      var day = now.getDay();
      var mins = now.getHours() * 60 + now.getMinutes();
      var sch = schedule[day];
      var isOpen = mins >= sch.open && mins < sch.close;

      var dot = document.getElementById('status-dot');
      var text = document.getElementById('status-text');
      if (!dot || !text) return;

      if (isOpen) {
        dot.className = 'status-dot open';
        text.innerHTML =
          '<span class="state">เปิดให้บริการอยู่ตอนนี้</span><span class="sep">•</span>ปิด ' +
          minToLabel(sch.close) +
          ' น.';
      } else {
        dot.className = 'status-dot closed';
        var nextLabel = '';
        if (mins < sch.open) {
          nextLabel = 'เปิดวันนี้ ' + minToLabel(sch.open) + ' น.';
        } else {
          var nextDay = (day + 1) % 7;
          nextLabel = 'เปิดพรุ่งนี้ ' + minToLabel(schedule[nextDay].open) + ' น.';
        }
        text.innerHTML =
          '<span class="state">ปิดรับผู้ป่วยแล้ว</span><span class="sep">•</span>' + nextLabel;
      }

      var rows = document.querySelectorAll('#hours-table tr');
      rows.forEach(function (row) {
        row.classList.toggle('today', parseInt(row.getAttribute('data-day') || '-1') === day);
      });
      var todayHours = document.getElementById('today-hours');
      if (todayHours) {
        todayHours.textContent = minToLabel(sch.open) + ' – ' + minToLabel(sch.close) + ' น.';
      }
    }

    update();
    var interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  return null;
}
