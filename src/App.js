import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import MaterialTable from "material-table";

function App() {
  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography>Pagination API</Typography>
        </Toolbar>
      </AppBar>
      <div style={{ height: "100px", width: "100%" }} />
      <div>
        <MaterialTable
          title="Remote Data Preview"
          columns={[
            { title: "Id", field: "_id" },
            { title: "Name", field: "name" },
            { title: "Location", field: "location" },
            {
              title: "Created At",
              field: "createdAt",
              type: "datetime",
            },
            { title: "Updated At", field: "updatedAt", type: "datetime" },
          ]}
          data={(query) =>
            new Promise(async (resolve, reject) => {
              let url = "http://localhost/api/stores?";
              url += "limit=" + query.pageSize;
              url += "&page=" + parseInt(query.page + 1);

              fetch(url)
                .then((response) => response.json())
                .then((result) => {
                  resolve({
                    data: result.docs,
                    page: result.page - 1,
                    totalCount: result.totalDocs,
                  });
                });
            })
          }
        />
      </div>
    </div>
  );
}

export default App;
