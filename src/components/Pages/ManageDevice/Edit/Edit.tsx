import Form from "./Form";
import BreadCrumb from "../../../Common/Breadcrumb/BreadCrumb";
import { useParams } from "react-router-dom";

const EditDeviceInformation = () => {

    const { id } = useParams()

    return (
        <div className="mx-auto mb-16 ">
            <div>
                <BreadCrumb
                    links={[
                        { path: "List of Devices", url: "/admin/manage-devices" },
                        { path: "Edit Device Information", url: "" },
                    ]}
                />
                <p className="text-xl font-extrabold text-SpaceCadet font-nunitoRegular">
                    Edit Device Information
                </p>
                <br />

                <div className="w-full rounded-lg">
                    <Form id={id} />
                </div>
            </div>
        </div>
    );
};
export default EditDeviceInformation;
