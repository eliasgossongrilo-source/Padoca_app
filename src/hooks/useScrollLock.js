import { useEffect } from 'react'

/**
 * useScrollLock - Premium Body Scroll Locking
 * Prevents layout shifts by accounting for scrollbar width.
 */
export const useScrollLock = (isLocked) => {
    useEffect(() => {
        const root = document.getElementById('root')
        if (!isLocked || !root) return

        // Calculate scrollbar width relative to root
        const scrollbarWidth = root.offsetWidth - root.clientWidth

        // Save current styles
        const originalStyle = window.getComputedStyle(root).overflow
        const originalPaddingRight = window.getComputedStyle(root).paddingRight

        // Lock root and add padding to prevent shift
        root.style.overflow = 'hidden'

        // Only add padding if there was a scrollbar
        if (scrollbarWidth > 0) {
            root.style.paddingRight = `${parseInt(originalPaddingRight || 0) + scrollbarWidth}px`
        }

        return () => {
            // Restore original styles
            root.style.overflow = originalStyle
            root.style.paddingRight = originalPaddingRight
        }
    }, [isLocked])
}
