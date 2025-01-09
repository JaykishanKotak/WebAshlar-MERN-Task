import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material';
import { Const } from '@utils/Const';
import { ceil } from 'lodash';

interface PaginationProps {
    count: number;
    page: number;
    onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}


const CommonPagination: React.FC<PaginationProps> = ({ count = 10, page, onPageChange }) => {
    const theme = useTheme()
    if (count <= Const.DEFAULT_PAGE_SIZE) return null
    const pageCount = ceil(count / Const.DEFAULT_PAGE_SIZE)

    return (
        <Stack spacing={2}>
            <Pagination
                color="primary"
                count={pageCount}
                page={page}
                onChange={onPageChange}
                size={theme.breakpoints.down('sm') ? 'small' : 'medium'}
            />
        </Stack>
    );
};

export default CommonPagination;