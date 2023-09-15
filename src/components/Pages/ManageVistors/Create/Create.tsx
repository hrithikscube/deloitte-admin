import Form from "./Form";
import BreadCrumb from "../../../Common/Breadcrumb/BreadCrumb";

const CreateVisitor = () => {
    return (
        <div className="mx-auto mb-16 ">
            <div>
                <BreadCrumb
                    links={[
                        { path: "List of Visitors", url: "/admin/manage-visitors" },
                        { path: "Add New Visitor", url: "" },
                    ]}
                />
                <p className="text-xl font-extrabold text-SpaceCadet font-nunitoRegular">
                    Add New Visitor
                </p>
                <br />

                <div className="w-full rounded-lg">
                    <Form isview={false} />
                </div>
            </div>
        </div>
    );
};
export default CreateVisitor;
