import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { GrStatusGood } from "react-icons/gr";
import { IoIosCloseCircle } from "react-icons/io";
import { MdOutlinePending } from "react-icons/md";
import {
  setUpdateRequestTable,
  setVenodrVehilces,
  setadminVenodrRequest,
} from "../../../redux/vendor/vendorDashboardSlice";

const VenderVehicleRequests = () => {
  const { vendorVehilces, adminVenodrRequest } = useSelector(
    (state) => state.vendorDashboardSlice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchVendorRequest = async () => {
      try {
        const res = await fetch("/api/admin/fetchVendorVehilceRequests", {
          method: "GET",
        });

        if (!res.ok) {
          console.error("Failed to fetch vendor vehicle requests:", res.statusText);
          dispatch(setVenodrVehilces([]));
          dispatch(setadminVenodrRequest([]));
          return;
        }

        const payload = await res.json();
        const requests = Array.isArray(payload?.data) ? payload.data : [];
        dispatch(setVenodrVehilces(requests));
        dispatch(setadminVenodrRequest(requests));
      } catch {
        dispatch(setVenodrVehilces([]));
        dispatch(setadminVenodrRequest([]));
      }
    };

    fetchVendorRequest();
  }, [dispatch]);

  const handleApproveRequest = async (id) => {
    try {
      const res = await fetch("/api/admin/approveVendorVehicleRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });

      if (!res.ok) {
        return;
      }

      dispatch(setUpdateRequestTable(id));
    } catch {
      return;
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await fetch("/api/admin/rejectVendorVehicleRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });

      if (!res.ok) {
        return;
      }

      dispatch(setUpdateRequestTable(id));
    } catch {
      return;
    }
  };

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value}
          style={{
            width: "50px",
            height: "40px",
            borderRadius: "5px",
            objectFit: "cover",
          }}
          alt="vehicle"
        />
      ),
    },
    {
      field: "registeration_number",
      headerName: "Register Number",
      width: 150,
    },
    { field: "company", headerName: "Company", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) =>
        params.row.status === "Pending" ? (
          <div className="flex items-center justify-center gap-x-1 rounded-lg bg-lime-100 p-2 text-lime-500">
            <span className="text-[10px]">Pending</span>
            <MdOutlinePending />
          </div>
        ) : (
          <div className="flex items-center justify-center gap-x-1 rounded-lg bg-green-100 p-2 text-green-500">
            <span className="text-[10px]">Approved</span>
            <GrStatusGood />
          </div>
        ),
    },
    {
      field: "Approve",
      headerName: "Approve",
      width: 100,
      renderCell: (params) => (
        <Button className="bg-green-500" onClick={() => handleApproveRequest(params.row.id)}>
          <GrStatusGood style={{ fontSize: 24, color: "green" }} />
        </Button>
      ),
    },
    {
      field: "reject",
      headerName: "Reject",
      width: 100,
      renderCell: (params) => (
        <Button className="bg-red-200" onClick={() => handleReject(params.row.id)}>
          <IoIosCloseCircle style={{ fontSize: 28, color: "red" }} />
        </Button>
      ),
    },
  ];

  const rows = useMemo(
    () =>
      (adminVenodrRequest || [])
        .filter(
          (vehicle) =>
            vehicle.isRejected !== true &&
            vehicle.isAdminApproved !== true &&
            vehicle.isDeleted !== "true" &&
            vehicle.isDeleted !== true
        )
        .map((vehicle) => ({
          id: vehicle._id,
          image: vehicle.image?.[0],
          registeration_number: vehicle.registeration_number,
          company: vehicle.company,
          name: vehicle.name,
          status: "Pending",
        })),
    [adminVenodrRequest]
  );

  const isVendorVehiclesEmpty = !vendorVehilces || rows.length === 0;

  return (
    <div className="max-w-[1000px] items-end justify-end rounded-md bg-slate-100 p-10 text-start">
      {isVendorVehiclesEmpty ? (
        <p>No requests yet</p>
      ) : (
        <Box sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: rows.length > 10 ? 10 : 5,
                },
              },
            }}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
            sx={{
              ".MuiDataGrid-columnSeparator": {
                display: "none",
              },
              "&.MuiDataGrid-root": {
                border: "none",
              },
            }}
          />
        </Box>
      )}
    </div>
  );
};

export default VenderVehicleRequests;
