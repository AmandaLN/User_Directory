import React from "react";
import Nav from "./Nav";
import API from "../utils/API";


class Main extends React.Component {
    state = {
      result: [{}],
      filteredUsers: [{}],
      order: "descend"
    };
//   headings for the table
    headings = [
        { name: "Image", width: "10%" },
        { name: "Name", width: "10%" },
        { name: "Phone", width: "20%" },
        { name: "Email", width: "20%" },
        { name: "DOB", width: "10%" },
      ];
    //   order for the table
      handleSort = (heading) => {
        if (this.state.order === "descend") {
          this.setState({
            order: "ascend",
          });
        } else {
          this.setState({
            order: "descend",
          });
        }
        const compareFnc = (a, b) => {
          if (this.state.order === "ascend") {
            if (a[heading] === undefined) {
              return 1;
            } else if (b[heading] === undefined) {
              return -1;
            } else if (heading === "name") {
              return a[heading].first.localeCompare(b[heading].first);
            } else {
              return b[heading] - a[heading];
            }
          } else {
            if (a[heading] === undefined) {
              return 1;
            } else if (b[heading] === undefined) {
              return -1;
            } else if (heading === "name") {
              return b[heading].first.localeCompare(a[heading].first);
            } else {
              return b[heading] - a[heading];
            }
          }
        };
        const sortedUsers = this.state.filteredUsers.sort(compareFnc);
        this.setState({ filteredUsers: sortedUsers });
      };
    // When this component mounts, calls API and table shows
    componentDidMount() {
        API.getUsers()
        .then(res => {
            
            this.setState({ result: res.data.results, filteredUsers: res.data.results })})
        .catch(err => console.log(err));
    }
    // filters the table while you are typing in search
    handleSearchChange = (event) => {
        const filter = event.target.value;
        const filteredList = this.state.result.filter((item) => {
          let values = Object.values(item).join("").toLowerCase();
          return values.indexOf(filter.toLowerCase()) !== -1;
        });
    
        this.setState({ filteredUsers: filteredList });
      };
    
  
    // When the form is submitted, search the user API for the value of `this.state.search`
    // handleFormSubmit = event => {
    //   event.preventDefault();
    //   this.searchUsers(this.state.search);
    // };
    //   formating DOB
    formatDate = (date) => {
        const dateArray = date.split("-");
        const year = dateArray[0];
        const month = dateArray[1];
        const dayArray = dateArray[2].split("T");
        const day = dayArray[0];
        const formattedDate = [month, day, year].join("-");
        return formattedDate
    }
    // Rendering everything to the page
    render() {
  
        return (
          <>
            <Nav handleSearchChange={this.handleSearchChange} />
            <div className="data-area">
            <div className="datatable mt-5">
            <table id="table" className="table table-striped table-hover">
            <thead>
                <tr>
                    {this.headings.map(({name, width}) => {
                        return (
                            <th 
                            className="col" 
                            key={name} 
                            style={{width}}
                            onClick = {() => {
                                this.handleSort(name.toLowerCase());
                            }}
                            >
                            {name}
                            <span className="pointer"></span>
                            </th>
                        );
                    })}
                </tr>
                </thead>
                <tbody>
        {this.state.filteredUsers[0] !== undefined && this.state.filteredUsers[0].name !== undefined ? (
          this.state.filteredUsers.map(({ login, name, picture, phone, email, dob }) => {
              
            return (
              <tr key={login.uuid}>
                <td data-th="Image" className="align-middle">
                  <img
                    src={picture.medium}
                    alt={"profile image for " + name.first + " " + name.last}
                    className="img-responsive"
                  />
                </td>
                <td data-th="Name" className="name-cell align-middle">
                  {name.first} {name.last}
                </td>
                <td data-th="Phone" className="align-middle">
                  {phone}
                </td>
                <td data-th="Email" className="align-middle">
                  <a href={"mailto:" + email} target="__blank">
                    {email}
                  </a>
                </td>
                <td data-th="DOB" className="align-middle">
                  {this.formatDate(dob.date)}
                </td>
              </tr>
            );
          })
        ) : (
          <></>
        )}
      </tbody>
            </table>
        </div>

            </div>
          </>
        );
      }
    }
export default Main;