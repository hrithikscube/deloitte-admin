import Validator from "validatorjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Input } from "../../Common/Input/Input";
import CustomButton from "../../Common/Button";
import Authenticated from "../../Authenticated";

import ZainSmallLogo from "../../../assets/images/ZainLogos/ZainSmallLogo.svg";

import LightHide from "../../../assets/icons/LightIcons/LightHide.svg";
import LightShow from "../../../assets/icons/LightIcons/LightShow.svg";


const CreatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams();

    const fields: any = {
        password: "",
        password_confirmation: "",
    };

    const [params, setParams] = useState(fields);
    const [formErrors, setFormErrors] = useState(fields);
    const [eyeOpen, seteyeOpen] = useState(false);
    const { user, isLoading, errors } = useSelector((state: any) => state.auth);

    useEffect(() => {
        if (Object.keys(user).length) {
            navigate("/admin/employees");
        }
    }, [user]);

    const apiError = errors.updatePassword;
    let errorMessage = "";
    if (apiError) {
        errorMessage = apiError[Object.keys(apiError)[0]] || apiError;
    }
    const handleChange = (e: any) => {
        if (e.currentTarget.value.includes(" ")) {
            e.currentTarget.value = e.currentTarget.value.replace(/\s/g, "");
        }
        setParams({ ...params, [e.target.name]: e.target.value });
        setFormErrors(fields);
    };

    const submit = async (e: any) => {
        e.preventDefault();
        const validation = new Validator(params, {
            password: "required|min:8|max:14|confirmed",
            password_confirmation: "required|min:8|max:14",
        });

        if (validation.fails()) {
            const fieldErrors: any = {};
            Object.keys(validation.errors.errors).forEach((key) => {
                fieldErrors[key] = validation.errors.errors[key][0];
            });
            setFormErrors(fieldErrors);
            return false;
        }

        params.access_token = token;
        return true;
    };

    return (
        <>
            <Authenticated>
                <div className="flex md:hidden w-full gap-2 justify-center pb-8">
                    <img
                        className=" w-1/5"
                        src='/assets/images/logo.svg'
                        alt="zainmain_logo"
                    />
                </div>

                <div className="w-11/12 md:w-inherit sm:mx-auto  rounded-lg  bg-white md:bg-inherit mx-6 md:mx-0 ">
                    <div className=" flex flex-col justify-center items-center p-4  md:p-12 rounded-lg ">
                        <p className="text-Sailboat  text-xl  font-nunitoBold flex items-center gap-2 mb-4">
                            Welcome to Scube
                        </p>
                        <p className="text-center md:text-left text-xs text-Sailboat mb-8">
                            Please sign-in to your account and start the
                            adventure!
                        </p>

                        {/* First Time Login & Login  */}

                        <form
                            className="flex flex-col gap-y-5 w-full "
                            onSubmit={submit}
                        >
                            <div className=" relative">
                                <Input
                                    rows={1}
                                    width="w-full"
                                    disabled={false}
                                    readOnly={false}
                                    label="Enter Password"
                                    name="password"
                                    value={params?.password}
                                    handleChange={handleChange}
                                    type={eyeOpen ? "text" : "password"}
                                    helperText={
                                        !formErrors?.password?.includes("match")
                                            ? formErrors?.password
                                            : ""
                                    }
                                    error={formErrors?.password?.length > 0}
                                />
                                {eyeOpen ? (
                                    <img
                                        className=" absolute right-2 top-4 cursor-pointer"
                                        onClick={() => seteyeOpen(false)}
                                        src={LightShow}
                                        alt="eye-closed"
                                    />
                                ) : (
                                    <img
                                        className=" absolute right-2 top-4 cursor-pointer"
                                        onClick={() => seteyeOpen(true)}
                                        src={LightHide}
                                        alt="eye-closed"
                                    />
                                )}
                            </div>
                            <Input
                                rows={1}
                                width="w-full"
                                disabled={false}
                                readOnly={false}
                                label="Confirm Password"
                                name="password_confirmation"
                                value={params?.password_confirmation}
                                handleChange={handleChange}
                                type="password"
                                helperText={
                                    !formErrors?.password_confirmation?.includes(
                                        "match"
                                    )
                                        ? formErrors?.password_confirmation
                                        : ""
                                }
                                error={
                                    formErrors?.password_confirmation?.length >
                                        0 ||
                                    (formErrors?.password?.includes("match") &&
                                        params?.password_confirmation)
                                }
                            />{" "}
                            <p className="pl-4  text-xs text-red-600">
                                {formErrors?.password?.includes("match") &&
                                    params?.password_confirmation &&
                                    "Password does not match."}
                            </p>
                            {errorMessage ? (
                                <p className="pl-4  text-xs text-red-600">
                                    {errorMessage}
                                </p>
                            ) : (
                                ""
                            )}
                            <CustomButton
                                type="submit"
                                variant="contained"
                                disabled={isLoading}
                            >
                                Update Password
                            </CustomButton>
                        </form>
                    </div>
                </div>
            </Authenticated>
        </>
    );
};

export default CreatePassword;
