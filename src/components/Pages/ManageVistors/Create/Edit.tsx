import Form from "./Form";
import BreadCrumb from "../../../Common/Breadcrumb/BreadCrumb";
import { useParams } from "react-router";

const EditVisitor = () => {

    const { id } = useParams()

    return (
        <div className="mx-auto mb-16 ">
            <div>
                <BreadCrumb
                    links={[
                        { path: "List of Visitors", url: "/admin/manage-visitors" },
                        { path: "View Visitor", url: `/admin/manage-visitors/view-visitor/${id}` },
                        { path: "Edit Visitor", url: "" },
                    ]}
                />
                <p className="text-xl font-extrabold text-SpaceCadet font-nunitoRegular">
                    Edit Visitor Information
                </p>
                <br />

                <div className="w-full rounded-lg">
                    <Form id={id} isview={false} />
                </div>
            </div>
        </div>
    );
};
export default EditVisitor;
