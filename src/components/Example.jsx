import React, { useState } from "react";

const Example = () => {

    const [count, setCount] = useState(0);
    const [user, setUser] = useState({
        name : "Andreas",
        familyName : "Malleus"
    })
    // [current state, this.setState] = useState(initialState)

    return (
        <div>
            <p>You clicked {count} times</p>
            <p>{user.name}</p>
        </div>
      );
}

export default Example;