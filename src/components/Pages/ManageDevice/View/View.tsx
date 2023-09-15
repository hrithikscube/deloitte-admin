import { useMemo, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { decryptData, encryptData } from "../../../../utils/encryption";
import BreadCrumb from "../../../Common/Breadcrumb/BreadCrumb";

import CustomButton from "../../../Common/Button";
import { Link } from "react-router-dom";
import Popup from "../../../Common/Popup";

const ViewPackage = () => {
    let { id } = useParams();
    id = decryptData(id);
    const navigate = useNavigate();
    const [isloading, setisLoading] = useState(false);
    const [open, setOpen] = useState({
        success: false,
        warning: false,
        question: false,
    });

    const deletePackage = () => {
        handlePopup("warning", true);
    };
    const handlePopup = (key: any, value: any) => {
        setOpen({ ...open, [key]: value });
    };

    const handleYes = async () => {
        setisLoading(true);
    };

    const handleNo = () => {
        handlePopup("warning", false);
    };

    
    return (
        <div className="container mx-auto mb-16">
            <div>
                <div className="flex justify-between">
                <div>
                <BreadCrumb
                    links={[
                        { path: "Cards", url: "/cards" },
                        { path: "View Card", url: "" },
                    ]}
                />
                <p className="text-xl font-extrabold text-SpaceCadet font-nunitoRegular">
                    View Card
                </p>
                </div>
                <Link to={`/cards/edit/${encryptData(id)}`}>
                      <CustomButton
                          borderRadius="0.5rem"
                          icon={
                              <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                              >
                                  <path
                                      d="M9.16553 13.6292H14.0006"
                                      stroke="#141C4C"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                  />
                                  <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M8.52001 2.52986C9.0371 1.91186 9.96666 1.82124 10.5975 2.32782C10.6324 2.35531 11.753 3.22586 11.753 3.22586C12.446 3.64479 12.6613 4.5354 12.2329 5.21506C12.2102 5.25146 5.87463 13.1763 5.87463 13.1763C5.66385 13.4393 5.34389 13.5945 5.00194 13.5982L2.57569 13.6287L2.02902 11.3149C1.95244 10.9895 2.02902 10.6478 2.2398 10.3849L8.52001 2.52986Z"
                                      stroke="#141C4C"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                  />
                                  <path
                                      d="M7.34766 4L10.9825 6.79142"
                                      stroke="#141C4C"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                  />
                              </svg>
                          }
                          // width='w-44'
                          variant="outlined"
                          size="large"
                      >
                          Edit
                      </CustomButton>
                  </Link>
                </div>
               
              
                <br />
               

                <div className="w-full rounded-lg">
                </div>
            </div>
            <div className="">
                {/* 1. Warning Popup */}
                <Popup
                    handleYes={handleYes}
                    handleNo={handleNo}
                    open={open.warning}
                    handlePopup={handlePopup}
                    popup="warning"
                    isdeletebtn
                    subtitle="Are your sure need to delete this package?"
                    popupmsg="Doing this will completely delete information and that cannot be retained again!"
                />
            </div>
        </div>
    );
};
export default ViewPackage;
