import { Button } from "primereact/button";

import './CheckMultipleName.css'

const CheckMultipleName = ({setVisible,setProject}) => {

    return (<>
        <p className="m-0">
            כבר קיים פרויקט בשם זה.
            <br></br>
            האם אתה בטוח שברצונך להמשיך?
        </p>
        <div id="buttons" >
            <Button label="כן" onClick={() => setVisible(false)}></Button>
            <Button label="לא" severity="secondary" onClick={() => {
                setVisible(false)
                setProject((prevProject) => ({
                    ...prevProject,
                    name: ''
            }))
            }} ></Button>
        </div>
    </>)
}
export default CheckMultipleName;
