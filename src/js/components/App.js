import React from "react";
import List from "./List";
import Form from "./Form";
import Posts from "./Posts";
import SagaPosts from "./SagaPosts";

const App = () => (
  <>
    <div>
      <h2>Articles</h2>
      <List />
    </div>
    <div>
      <h2>Add a new article</h2>
      <Form />
    </div>
    <div>
      <h2>API posts(Saga)</h2>
      <SagaPosts />
    </div>
    <div>
      <h2>API posts(Thunk)</h2>
      <Posts />
    </div>
  </>
);

export default App;