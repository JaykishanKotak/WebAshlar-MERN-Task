import React from "react";
import { Controller } from "react-hook-form";
import APICall from "@utils/APICall";
import { EndPoints } from "@utils/EndPoints";
import { useDispatch } from "react-redux";
import { toggleLoader } from "@store/common/commonSlice";
import { toast } from "react-toastify";
import { last } from "lodash";
import UserSearchAutocomplete from "./UserSearchAutocomplete";

interface AttendeeSelectProps {
    name: string;
    control: any;
    watch: any
}

const AttendeeSelect: React.FC<AttendeeSelectProps> = ({ name, control, watch }) => {
    const dispatch = useDispatch()
    const checkUserStatus = (user: any, value: any, onChange: any) => {
        let isUser = false
        const selectedUser: any = last(user)
        const payload = {
            userId: selectedUser._id
        }
        dispatch(toggleLoader(true))

        APICall("GET", payload, EndPoints.MEETING_USER_STATUS).then((res: any) => {
            isUser = res?.isUserAvaliable
        }).catch(() => {
            isUser = false
        }).finally(() => {
            dispatch(toggleLoader(false))
            if (isUser) {
                const updatedValue = [...(value || []), selectedUser];

                const uniqueValue = updatedValue.filter(
                    (v, i, a) => v && a.findIndex((t) => t._id === v._id) === i
                );

                onChange(uniqueValue);
            } else {
                toast.error("User is already assigned for a meeting");
            }
        })
    }

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
                return (
                    <div>
                        <UserSearchAutocomplete
                            onUserSelect={async (selectedUser) => {
                                if (selectedUser) {
                                    await checkUserStatus(selectedUser, value, onChange);
                                }
                            }}
                            selectedUsers={watch(name) || []}
                        />
                        {error && <span style={{ color: "red" }}>{error.message}</span>}
                    </div>
                )
            }}
        />
    );
};

export default AttendeeSelect;
