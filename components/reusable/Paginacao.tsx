'use client';

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    setCurrentPage: any;
}

export function Paginacao(props: PaginationProps) {
    const { currentPage, setCurrentPage, totalPages } = props;

    const handleNextPage = () => {
        setCurrentPage((current: number) => current + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((current: number) => current - 1);
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <ChevronLeftIcon
                        className={cn(
                            'cursor-pointer w-5 h-5',
                            currentPage === 1 && 'hidden',
                        )}
                        onClick={handlePrevPage}
                    />
                </PaginationItem>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <PaginationItem
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={cn(
                            index === currentPage - 1
                                ? 'cursor-pointer bg-neutral-600 rounded-full'
                                : '',
                        )}
                    >
                        <PaginationLink>{index + 1}</PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <ChevronRightIcon
                        className={cn(
                            'cursor-pointer w-5 h-5',
                            totalPages === 1 && 'hidden',
                        )}
                        onClick={handleNextPage}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
