import { createContext, useState } from "react";

export const AssignmentContext = createContext();

const AssignmentProvider = ({children}) => {

    const [selectedAssignmentId, setSelectedAssignmentId] = useState("");

    return ( 
        <AssignmentContext.Provider value={{selectedAssignmentId, setSelectedAssignmentId}}>
            {children}
        </AssignmentContext.Provider>
     );
}
 
export default AssignmentProvider;