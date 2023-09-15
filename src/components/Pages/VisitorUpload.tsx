import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import person from "../../assets/images/person.svg";
import axiosInstance from "../../utils/axios";
import { showToastMessage } from "../../utils/helpers";

const VisitorUploadPage = () => {
    // file to be sent
    const [image, setImage] = useState({}) as any;

    const [previewImage, setPreviewImage] = useState() as any;

    // when file is uploaded
    const [isUpload, setIsUpload] = useState(false);

    // completion flag
    const [done, setDone] = useState(false);

    const inputRef = useRef() as any;

    const convertBase64 = (file: any) => {
        // const isValid = validation(file); // validation for file type and size
        if (true) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const meta = {
                    name: file.name,
                    url: reader.result,
                    type: file.type,
                };
                setImage({
                    url: reader.result || "",
                    file,
                    preview: meta,
                });
                setIsUpload(true);
            };
        }
    };

    const onFilechange = (e: any) => {
        console.log(e.target.files[0], "at file upload");
        let { type } = e.target.files[0];
        let { size } = e.target.files[0];

        console.log(type, "file type");
        if (
            type === "image/png" ||
            type === "image/jpeg" ||
            type === "image/jpg"
        ) {
            if (size <= 500000) {
                // setIsUpload(true);
                convertBase64(e.target.files[0]);
                setImage(e.target.files[0]);
                setPreviewImage(URL.createObjectURL(e.target.files[0]));
            } else {
                showToastMessage(
                    "File exceeded maximum size of 500KB",
                    "error"
                );
            }
        } else {
            showToastMessage(
                "File uploaded should be of type image/png or image/jpeg or image/jpg",
                "error"
            );
            return;
        }
    };
    const onBtnClick = () => {
        /*Collecting node-element and performing click*/
        inputRef.current.click();
    };

    const [isTokenValid, setIsTokenValid] = useState(false);

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [resMessage, setResMessage] = useState("");

    console.log(token, "token from query params");

    const validateVisitorApi = () => {
        axiosInstance
            .get(`/validate-visitor/${token}`)
            .then((response) => {
                console.log(response);
                let { data } = response.data;
                console.log(data,'data at visitor upload');
                if (data.toString !== "") {
                    showToastMessage(
                        "Visitor Successfully validated",
                        "success"
                    );
                    setIsTokenValid(true);
                }
            })
            .catch((error) => {
                let { response } = error;

                console.log(response.data, "response");

                let message = response.data.errors.message;
                console.log(message);
                setResMessage(message);

                // if (message === "Success") {
                //     setIsTokenValid(true);
                // }
                if (message === "Invalid Token") {
                    showToastMessage(message, "error");
                }
                if (message === "Photo already submitted") {
                    showToastMessage(message, "error");
                }
            });
    };

    useEffect(() => {
        validateVisitorApi();
    }, []);

    const imageUploadApi = () => {
        if (image.url !== "") {
            let payload = {
                image: image?.url,
            };
            axiosInstance
                .put(`/update-visitor-image/${token}`, payload)
                .then((response) => {
                    console.log(response);
                    showToastMessage(
                        "Visitor Image uploaded successfully",
                        "success"
                    );
                    setDone(true);
                })
                .catch((error) => {
                    console.log(error);
                    showToastMessage("Unable to process that request", "error");
                });
        } else {
            showToastMessage("Image cannot be empty.", "error");
            return;
        }
    };

    return (
        <Fragment>
            {/* change to true to check for image upload for testing purpose */}
            {isTokenValid ? (
                <>
                    {!done ? (
                        <div className="h-screen flex flex-col justify-center items-center bg-white mx-5">
                            <h1 className="lg:text-[22px] text-lg font-nunitoBold text-black text-center">
                                Hi, Upload your Face image here.
                            </h1>

                            <div className="uploadVisitorImageContainer lg:w-[620px] lg:h-[560px] lg:p-10 p-5 lg:mt-[50px] mt-2 flex flex-col lg:justify-between lg:gap-0 gap-3">
                                <div className="flex flex-col justify-center items-center">
                                    {isUpload ? (
                                        <img
                                            src={previewImage ?? person}
                                            alt={person}
                                            className="w-[150px] h-[150px] rounded-full object-cover"
                                        />
                                    ) : (
                                        <img src={person} alt={person} />
                                    )}
                                </div>

                                <div className="flex flex-col justify-center items-center">
                                    <input
                                        accept="image/png, image/jpeg"
                                        ref={inputRef}
                                        onChange={onFilechange}
                                        type="file"
                                        className="hidden"
                                        id="inputAvatar"
                                    />
                                    <button
                                        onClick={onBtnClick}
                                        className="text-white text-sm font-nunitoMedium bg-[#FF8059] rounded-lg h-[40px] px-10"
                                    >
                                        {isUpload
                                            ? "Upload Again"
                                            : "Choose Image"}
                                    </button>
                                </div>

                                <div className="border-b-2 border-[#E1E3E7]" />

                                <div className="flex flex-col gap-2">
                                    <h2 className="underline text-sm font-nunitoBold">
                                        Image Guidelines:
                                    </h2>
                                    <p className="text-sm font-nunitoMedium">
                                        1. Format:{" "}
                                        <span className="text-[#FF8059]">
                                            JPEG or PNG.
                                        </span>
                                    </p>
                                    <p className="text-sm font-nunitoMedium">
                                        2. File Size:{" "}
                                        <span className="text-[#FF8059]">
                                            Up to 500KB.
                                        </span>
                                    </p>
                                    <p className="text-sm font-nunitoMedium">
                                        3. The image should be a clear, recent,
                                        and full-face photograph.
                                    </p>
                                    <p className="text-sm font-nunitoMedium">
                                        4. Avoid wearing sunglasses, hats, or
                                        any other accessories <br /> that may
                                        obstruct facial features.
                                    </p>
                                    <p className="text-sm font-nunitoMedium">
                                        5. The image should be well-lit and in
                                        focus.
                                    </p>
                                </div>

                                {isUpload && (
                                    <Fragment>
                                        <div className="border-b-2 border-[#E1E3E7]" />
                                        <div className="flex flex-col justify-center items-center">
                                            <button
                                                onClick={imageUploadApi}
                                                className="text-black border border-black text-sm font-nunitoMedium bg-none rounded-lg h-[40px] px-5"
                                            >
                                                Done
                                            </button>
                                        </div>
                                    </Fragment>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="h-screen flex flex-col justify-center items-center bg-white">
                            <h1 className="text-[22px] font-nunitoBold text-black">
                                Thank you!
                            </h1>

                            <div className="uploadVisitorImageContainer lg:w-[752px] lg:p-10 p-5 lg:mt-[50px] mt-2 flex flex-col justify-between mx-5">
                                <div className="flex flex-col gap-2 lg:w-[632px]">
                                    <h2 className="underline text-sm font-nunitoBold">
                                        What’s Next:
                                    </h2>
                                    <p className="text-sm font-nunitoMedium">
                                        Rest assured that your uploaded image
                                        will be used solely for identification
                                        purposes during your visit. It will be
                                        securely stored and accessible only to
                                        authorized personnel responsible for
                                        managing office access.
                                    </p>
                                    <p className="text-sm font-nunitoMedium">
                                        If you have any questions or concerns
                                        regarding your upcoming visit or the
                                        uploaded image, please feel free to
                                        contact our support team at{" "}
                                        <span className="text-[#FF8059]">
                                            support@quantiphi.com.
                                        </span>
                                    </p>
                                    <p className="text-sm font-nunitoMedium">
                                        We look forward to welcoming you to our
                                        premises and hope you have a pleasant
                                        experience.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="h-screen flex flex-col justify-center items-center text-center p-5">
                    <h1 className="lg:text-5xl md:text-4xl text-3xl text-[#808080] font-nunitoMedium">
                        {resMessage}
                    </h1>
                    <p className="text-base mt-2">
                        Click the below button to navigate back home
                    </p>
                    <div className="mt-6">
                        <Link to="/admin/employees">
                            <a className="text-gray-500 font-mono text-xl bg-gray-200 p-3 rounded-md hover:shadow-md">
                                Back Home{" "}
                            </a>
                        </Link>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default VisitorUploadPage;
