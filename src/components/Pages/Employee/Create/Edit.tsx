import Form from "./Form";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../../Common/Breadcrumb/BreadCrumb";
import { decryptData } from "../../../../utils/encryption";

const EditEmployee = () => {
    const { id } = useParams();
    const leadId = decryptData(id);

    return (
        <div className="mx-auto">
            <div>
                <BreadCrumb
                    links={[
                        { path: "Employees", url: "/admin/employees" },
                        { path: "View Employee", url: `/admin/employees/view/${id}` },
                        { path: "Edit Employee", url: "" },
                    ]}
                />
                <p className="text-xl font-extrabold text-SpaceCadet font-nunitoRegular">
                    Edit Employee
                </p>

                <br />
                <Form isview={false} id={leadId} />
            </div>
        </div>
    );
};

export default EditEmployee;
