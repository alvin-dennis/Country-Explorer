import { Button } from "@/components/ui/button"
import { PaginationProps } from "@/lib/types"

function getPaginationRange(currentPage: number, totalPages: number, siblingCount = 1) {
    const totalPageNumbers = siblingCount * 2 + 5
    if (totalPageNumbers >= totalPages) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)
    const showLeftDots = leftSiblingIndex > 2
    const showRightDots = rightSiblingIndex < totalPages - 1
    if (!showLeftDots && showRightDots) {
        const leftRange = Array.from({ length: 3 + siblingCount * 2 }, (_, i) => i + 1)
        return [...leftRange, "...", totalPages]
    }
    if (showLeftDots && !showRightDots) {
        const rightRange = Array.from(
            { length: 3 + siblingCount * 2 },
            (_, i) => totalPages - (3 + siblingCount * 2) + 1 + i,
        )
        return [1, "...", ...rightRange]
    }
    const middleRange = Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i)
    return [1, "...", ...middleRange, "...", totalPages]
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null
    const pages = getPaginationRange(currentPage, totalPages)
    return (
        <div className="mt-10 flex items-center justify-center gap-2 flex-wrap">
            <Button
                variant="default"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Previous
            </Button>

            {pages.map((item, index) =>
                item === "..." ? (
                    <span key={`dots-${index}`} className="px-3 py-2 text-gray-500 dark:text-muted-foreground">
                        …
                    </span>
                ) : (
                        <Button
                            variant="default"
                            key={item}
                            onClick={() => onPageChange(item as number)}
                            className={
                                item === currentPage
                                    ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                                    : "border border-gray-300 text-white/80 hover:bg-gray-600 dark:border-border dark:text-muted-foreground dark:hover:bg-muted"
                            }
                        >
                            {item}
                        </Button>
                ),
            )}

            <Button
                variant="default"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </Button>
        </div>
    )
}
