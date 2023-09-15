import Form from "./Form";
import BreadCrumb from "../../../Common/Breadcrumb/BreadCrumb";

const Create = () => {
    return (
        <div className="mx-auto mb-16 ">
            <div>
                <BreadCrumb
                    links={[
                        { path: "List of Employees", url: "/admin/employees" },
                        { path: "Add Individual Employee", url: "" },
                    ]}
                />
                <p className="text-xl font-extrabold text-SpaceCadet font-nunitoRegular">
                    Add Individual Employee
                </p>
                <br />

                <div className="w-full rounded-lg">
                    <Form isview={false} />
                </div>
            </div>
        </div>
    );
};
export default Create;
