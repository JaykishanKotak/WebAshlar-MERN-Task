import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CommonButton from '@components/common-button/CommonButton';
import { map } from 'lodash';
import CommonNoRecordsFound from '@components/common-no-record-found/CommonNoRecordsFound';

interface Action {
    label: string;
}

interface CommonDataTableProps<T> {
    columns: any[];
    data: T[];
    actions: Action[];
    onActionClick: (action: Action, row: T) => void;
}

const CommonDataTable = <T,>({
    columns,
    data,
    actions,
    onActionClick,
}: CommonDataTableProps<T>) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="dynamic table">
                <TableHead>
                    <TableRow>
                        {map(columns, (column, index) => (
                            <TableCell key={`cell-${index}`}>{column.name}</TableCell>
                        ))}
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length > 0 ? map(data, (row: any, index) => (
                        <TableRow key={`row-${index}`}>
                            {map(columns, (column, colIndex) => (
                                <TableCell key={`row-cell-${colIndex}`}>{row[column?.value]}</TableCell>
                            ))}
                            <TableCell>
                                {map(actions, (action, actionIndex) => (
                                    <CommonButton
                                        key={`action-button-${actionIndex}`}
                                        variant="outlined"
                                        color="primary"
                                        sx={{
                                            margin: '0 5px',
                                            padding: '6px 12px',
                                            borderRadius: '8px',
                                            '&:hover': {
                                                backgroundColor: 'primary.main',
                                                color: 'white',
                                            },
                                        }}
                                        onClick={() => onActionClick(action, row)}
                                        label={action.label}
                                    />

                                ))}
                            </TableCell>
                        </TableRow>
                    )) : (<CommonNoRecordsFound />)}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CommonDataTable;
