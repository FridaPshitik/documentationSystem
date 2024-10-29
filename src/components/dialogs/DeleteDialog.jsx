import { Button } from "primereact/button";

export const DeleteDialog = ({
  project,
  confirmDelete,
  hideDeleteProjectDialog,
}) => {
  return (
    <>
      <div className="confirmation-content">
        <i
          className="pi pi-exclamation-triangle mr-3"
          style={{ fontSize: "2rem", paddingLeft: "1rem" }}
        />
        {project && (
          <span>
            האם למחוק <b>{project.name}</b>?
          </span>
        )}
        <div style={{ direction: "ltr", marginTop: "10px", marginLeft: "5px" }}>
          <Button
            icon="pi pi-times"
            outlined
            text
            onClick={hideDeleteProjectDialog}
          />
          <Button
            icon="pi pi-check"
            outlined
            text
            severity="danger"
            onClick={confirmDelete}
          />
        </div>
      </div>
    </>
  );
};
