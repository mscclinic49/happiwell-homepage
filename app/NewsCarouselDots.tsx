'use client';

import { useEffect } from 'react';

// Verbatim port of the news-carousel dot-indicator logic from happiwell-homepage.html.
// Builds dots dynamically based on however many .news-card elements exist (works
// whether the news section is 3 static cards or later becomes a dynamic list from
// Supabase), and keeps the active dot in sync with horizontal scroll position on mobile.
export default function NewsCarouselDots() {
  useEffect(() => {
    var track = document.querySelector('.news-grid');
    var dotsBox = document.getElementById('news-dots');
    if (!track || !dotsBox) return;

    // Clear any dots from a previous mount (e.g. React strict-mode double effect)
    dotsBox.innerHTML = '';

    var cards = Array.prototype.slice.call(track.querySelectorAll('.news-card'));
    if (cards.length <= 1) return;

    cards.forEach(function (card: Element, i: number) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'บทความที่ ' + (i + 1));
      dot.addEventListener('click', function () {
        card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      });
      dotsBox!.appendChild(dot);
    });
    var dots = Array.prototype.slice.call(dotsBox.querySelectorAll('.dot'));

    function updateActiveDot() {
      var trackRect = (track as Element).getBoundingClientRect();
      var center = trackRect.left + trackRect.width / 2;
      var closest = 0,
        minDist = Infinity;
      cards.forEach(function (card: Element, i: number) {
        var rect = card.getBoundingClientRect();
        var dist = Math.abs(rect.left + rect.width / 2 - center);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      dots.forEach(function (d: Element, i: number) {
        d.classList.toggle('active', i === closest);
      });
    }

    var ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          updateActiveDot();
          ticking = false;
        });
        ticking = true;
      }
    }
    track.addEventListener('scroll', onScroll);
    return () => track!.removeEventListener('scroll', onScroll);
  }, []);

  return null;
}
