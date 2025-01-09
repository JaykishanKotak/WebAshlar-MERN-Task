import React, { useCallback, useEffect, useState } from "react";
import { Autocomplete, Box, TextField, CircularProgress, Chip } from "@mui/material";
import { debounce, map } from "lodash";
import APICall from "@utils/APICall";
import { EndPoints } from "@utils/EndPoints";

interface User {
    id: string;
    name: string;
}

interface UserSearchAutocompleteProps {
    onUserSelect: (users: User[]) => void;
    selectedUsers: User[];
}

const UserSearchAutocomplete: React.FC<UserSearchAutocompleteProps> = ({
    onUserSelect,
    selectedUsers,
}) => {
    const [options, setOptions] = useState<User[]>([]);
    const [inputValue, setInputValue] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const debounceSearch = useCallback(
        debounce(async (query: string) => {
            if (query) {
                setLoading(true);
                APICall("GET", { searchText: query }, EndPoints.SEARCH_USER)
                    .then((res: any) => {
                        setOptions(res.data || []);
                    })
                    .catch(() => {
                        setOptions([]);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            } else {
                setOptions([]);
            }
        }, 500),
        []
    );

    useEffect(() => {
        debounceSearch(inputValue);
    }, [inputValue, debounceSearch]);

    return (
        <Autocomplete
            multiple
            options={options}
            value={selectedUsers}
            getOptionLabel={(option) => option.name}
            onChange={(_, value) => onUserSelect(value as User[])}
            onInputChange={(_, value) => setInputValue(value)}
            renderOption={(props: any, option) => (
                <Box {...props} key={`opt-box-${option.id}`}>
                    {option.name}
                </Box>
            )}
            renderTags={(value, getTagProps) =>
                map(value, (option: any, index) => (
                    <Chip
                        label={option.name}
                        {...getTagProps({ index })}
                    />
                ))
            }
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search Users"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    );
};

export default UserSearchAutocomplete;
