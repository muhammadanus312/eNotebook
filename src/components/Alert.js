import React from "react";

export default function alert(props) {
  return (
    <div style={{height:'50px'}}>
   {props.alert && <div>
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>{props.alert.type}!</strong> {props.alert.message}
      </div>
    </div>}
    </div>
  );
}
