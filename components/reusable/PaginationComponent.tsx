'use client';

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from '@/components/ui/pagination';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    setCurrentPage: any;
}

export function PaginationComponent(props: PaginationProps) {
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
                        className="cursor-pointer w-5 h-5"
                        onClick={handlePrevPage}
                    />
                </PaginationItem>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <PaginationItem
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={
                            index === currentPage - 1
                                ? 'cursor-pointer bg-neutral-600 rounded-full'
                                : ''
                        }
                    >
                        <PaginationLink>{index + 1}</PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <ChevronRightIcon
                        className="cursor-pointer w-5 h-5"
                        onClick={handleNextPage}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
