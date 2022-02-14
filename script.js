class App extends React.Component {
        constructor() {
            super();
            this.state = {
                items: [],
                error: ""
            };

        }

        componentDidMount() {
            var items = this.state.items;
            // var url = "http://127.0.0.1:5555/employees2.json";
            // var url = "http://127.0.0.1:5555/employees.json";
            var url = "http://dummy.restapiexample.com/api/v1/employees";
            // axios.get('http://127.0.0.1:5555/employees2.json').

            let retries = 0;
            var success = false;
            const maxRetries = 9;

            // should be asynced, but for now this will do

            //   let interval = setInterval(() => {
            const retriesAxios = () => {
                axios.get(url).
                then(response => {
                        if (this.unmounted) return;
                        this.setState({ items: response.data.data });
                        console.log("" + response);
                        success = true;
                        // interval.clear();
                        let failedRequest = "";
                        this.setState({ error: '' });
                        //  this.setState({ error: failedRequest + "Success status: " + success });
                    },
                    error => {
                        let failedRequest = "Error: fetching API data was not successful";
                        this.setState({ error: failedRequest + " ... retryting in a sec. Success status: " + success });
                        // console.log("banan" + error);
                        // alert("Error: fetching API data was not successful. Please try again later. Yet no auto re-fetching of data. ");

                        retries++;
                        setTimeout(() => {
                            if (this.unmounted) return;
                            retriesAxios();
                            //this.componentDidMount();
                            console.log("retrying");
                        }, 1000);
                    });

            }
            retriesAxios();


        }

        componentWillUnmount() {
            this.unmounted = true;
        }


        render() {
                var items = this.state.items;
                return /*#__PURE__*/ React.createElement("table", { className: 'table table-striped ' },

                    React.createElement("thead", null, /*#__PURE__*/
                        React.createElement("tr", null, /*#__PURE__*/
                            React.createElement("th", null, 'Name'), /*#__PURE__*/
                            React.createElement("th", null, 'Salary'), /*#__PURE__*/
                            React.createElement("th", null, 'Age'), /*#__PURE__*/
                            React.createElement("th", null, 'Image') /*#__PURE__*/
                        )
                    ),

                    React.createElement("tbody", null,
                        items.map((item) => /*#__PURE__*/
                            React.createElement("tr", { key: item.id }, /*#__PURE__*/
                                React.createElement("td", { className: '' }, item.employee_name), /*#__PURE__*/
                                React.createElement("td", null, item.employee_salary), /*#__PURE__*/
                                React.createElement("td", null, item.employee_age), /*#__PURE__*/
                                React.createElement("td", null, item.image), /*#__PURE__*/

                            )
                        )
                    ), /*#__PURE__*/


                    React.createElement("td", { id: "error" }, this.state.error));

                //return
            } //render
    } //component

ReactDOM.render( /*#__PURE__*/ React.createElement(App, null), document.getElementById('main'));