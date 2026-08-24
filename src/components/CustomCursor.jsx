import React, { useEffect, useRef, useState } from 'react';
import '../styles/cursor.css';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const requestRef = useRef(null);
  
  // Track actual mouse position
  const mousePos = useRef({ x: -100, y: -100 });
  // Track interpolated ring position
  const ringPos = useRef({ x: -100, y: -100 });

  const [isVisible, setIsVisible] = useState(false);
  const [hoverState, setHoverState] = useState('default'); // 'default', 'button', 'link'
  const [isClicking, setIsClicking] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    // Check if it's a touch device or user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    if (prefersReducedMotion || isTouchDevice) {
      setIsDisabled(true);
      document.body.classList.add('no-custom-cursor');
      return;
    }

    const onMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      // Update dot position instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e) => {
      const target = e.target;
      
      // Check for links, buttons, and custom elements
      if (target.closest('a') || target.closest('.project-link')) {
        setHoverState('link');
      } else if (
        target.closest('button') || 
        target.closest('.project-card') || 
        target.closest('input') || 
        target.closest('textarea')
      ) {
        setHoverState('button');
      } else {
        setHoverState('default');
      }
    };

    const onMouseOut = (e) => {
      // Small timeout to prevent flickering when moving between elements
      setTimeout(() => {
        if (!document.querySelector(':hover')) {
           setHoverState('default');
        }
      }, 10);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const updateRing = () => {
      // Lerp (Linear Interpolation) for smooth trailing effect
      const lerpAmount = 0.15;
      
      // Calculate new position
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpAmount;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpAmount;

      // Apply transform with scaling if clicking
      if (ringRef.current) {
        const scale = isClicking ? 'scale(0.8)' : 'scale(1)';
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) ${scale}`;
      }

      requestRef.current = requestAnimationFrame(updateRing);
    };

    // Start animation loop
    requestRef.current = requestAnimationFrame(updateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible, isClicking]);

  if (isDisabled) return null;

  return (
    <div 
      className={`custom-cursor-container ${isVisible ? '' : 'cursor-hidden'} cursor-hover-${hoverState}`}
    >
      <div ref={ringRef} className="cursor-ring">
        <span className="cursor-label">
          {hoverState === 'link' ? 'OPEN' : ''}
        </span>
      </div>
      <div ref={dotRef} className="cursor-dot"></div>
    </div>
  );
};

export default CustomCursor;
