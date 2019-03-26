import React from "react";

export default class ReactChatListWithInfo extends React.Component {

  constructor() {
    super();
    this.state = {}
  }
  componentDidMount() {
//    const s = document.createElement('div');
//    s.type = 'text/javascript';
//    s.async = true;
//    s.innerHTML = "document.write('This is output by document.write()!')";
  }

  render() {

    console.group('COMPONENT# ' + this.constructor.name + '.render()');
    console.groupEnd();

    return (
      <>
      </>
    );
  }
};
