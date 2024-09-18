import { Button } from "primereact/button";


const CheckMultipleName = ({setVisible,setProjectName}) => {

    return (<>
        <p className="m-0">
            כבר קיים פרויקט בשם זה.
            <br></br>
            האם אתה בטוח שברצונך להמשיך?
        </p>
        <div style={{ direction: "ltr", marginTop: "10px" }} >
            <Button label="כן" onClick={() => setVisible(false)} style={{ margin: "2px" }}></Button>
            <Button label="לא" severity="secondary" style={{ margin: "2px" }} onClick={() => {
                setVisible(false)
                setProjectName('')
            }} ></Button>
        </div>
    </>)
}
export default CheckMultipleName;
