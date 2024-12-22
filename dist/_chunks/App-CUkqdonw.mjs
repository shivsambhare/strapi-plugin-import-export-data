import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { useFetchClient, Page } from "@strapi/strapi/admin";
import { Routes, Route } from "react-router-dom";
import { Modal, Button, SingleSelect, SingleSelectOption, Typography, Loader, Main } from "@strapi/design-system";
import { useState, useEffect } from "react";
import { P as PLUGIN_ID } from "./index-Cv5r5BNM.mjs";
function useCollectionList() {
  const [collectionsList, setCollectionsList] = useState([]);
  const { get } = useFetchClient();
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const { data } = await get(`${PLUGIN_ID}/get-collections-list`);
        setCollectionsList(data.data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };
    fetchCollections();
  }, []);
  return { collectionsList, setCollectionsList };
}
const ImportCSV = () => {
  const { collectionsList } = useCollectionList();
  const [selectedCollection, setSelectedCollection] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { post } = useFetchClient();
  const handleImport = async () => {
    if (!selectedCollection || !file) {
      alert("Please select a collection and upload a file.");
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("collectionName", selectedCollection);
    formData.append("csv", file);
    try {
      const { data } = await post(`${PLUGIN_ID}/import-data`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      if (data.message) {
        alert(data?.message || "");
      } else {
        alert("Failed to import data.");
      }
    } catch (error) {
      console.error("Error importing data:", error);
      alert("An error occurred while importing data.");
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Modal.Root, { children: [
    /* @__PURE__ */ jsx(Modal.Trigger, { children: /* @__PURE__ */ jsx(Button, { children: "Import" }) }),
    /* @__PURE__ */ jsxs(Modal.Content, { children: [
      /* @__PURE__ */ jsx(Modal.Header, { children: /* @__PURE__ */ jsx(Modal.Title, { children: "Import CSV Data" }) }),
      /* @__PURE__ */ jsxs(Modal.Body, { children: [
        /* @__PURE__ */ jsx(
          SingleSelect,
          {
            placeholder: "Select a collection",
            onChange: setSelectedCollection,
            value: selectedCollection,
            children: collectionsList?.map((key) => /* @__PURE__ */ jsx(SingleSelectOption, { value: key?.uid, children: key.name }, key?.uid))
          }
        ),
        /* @__PURE__ */ jsxs("div", { style: { marginTop: "16px", marginBottom: "16px" }, children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "file-upload", style: { display: "block", marginBottom: "8px" }, children: /* @__PURE__ */ jsx(Typography, { variant: "beta", children: "Upload CSV File" }) }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "file",
              id: "file-upload",
              accept: ".csv",
              onChange: (e) => setFile(e.target.files[0])
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Modal.Footer, { children: [
        /* @__PURE__ */ jsx(Modal.Close, { children: /* @__PURE__ */ jsx(Button, { variant: "tertiary", children: "Cancel" }) }),
        /* @__PURE__ */ jsx(Button, { onClick: handleImport, disabled: isLoading, children: isLoading ? "Importing..." : "Import Data" }),
        isLoading && /* @__PURE__ */ jsx(Loader, {})
      ] })
    ] })
  ] }) });
};
const ExportCSV = () => {
  const { collectionsList } = useCollectionList();
  const [selectedCollection, setSelectedCollection] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { get } = useFetchClient();
  async function jsonToCsv(jsonData) {
    const dataArray = Object.values(jsonData).map((item) => Object.values(item));
    const header = Object.keys(jsonData[0]).join(",");
    const csvString = [header, ...dataArray.map((row) => row.join(","))].join("\n");
    return csvString;
  }
  async function handleExport() {
    if (!selectedCollection) {
      alert("Please select a collection.");
      return;
    }
    try {
      setIsLoading(true);
      const { data } = await get(`${PLUGIN_ID}/export-data?collectionName=${selectedCollection}`);
      const csv = await jsonToCsv(data.data);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      if (blob) {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${selectedCollection}-export.csv`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Failed to fetch data.");
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      alert("Failed to export data");
    }
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Modal.Root, { children: [
    /* @__PURE__ */ jsx(Modal.Trigger, { children: /* @__PURE__ */ jsx(Button, { children: "Export" }) }),
    /* @__PURE__ */ jsxs(Modal.Content, { children: [
      /* @__PURE__ */ jsx(Modal.Header, { children: /* @__PURE__ */ jsx(Modal.Title, { children: "Export CSV Data" }) }),
      /* @__PURE__ */ jsx(Modal.Body, { children: /* @__PURE__ */ jsx(
        SingleSelect,
        {
          placeholder: "Select a collection",
          onChange: setSelectedCollection,
          value: selectedCollection,
          children: collectionsList?.map((key) => /* @__PURE__ */ jsx(SingleSelectOption, { value: key?.uid, children: key.name }, key?.uid))
        }
      ) }),
      /* @__PURE__ */ jsxs(Modal.Footer, { children: [
        /* @__PURE__ */ jsx(Modal.Close, { children: /* @__PURE__ */ jsx(Button, { variant: "tertiary", children: "Cancel" }) }),
        /* @__PURE__ */ jsx(Button, { onClick: () => handleExport(), disabled: isLoading, children: isLoading ? "Exporting..." : "Export Data" }),
        isLoading && /* @__PURE__ */ jsx(Loader, {})
      ] })
    ] })
  ] }) });
};
const ImportExport = () => {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx(ImportCSV, {}),
    /* @__PURE__ */ jsx(ExportCSV, {})
  ] });
};
const HomePage = () => {
  return /* @__PURE__ */ jsxs(Main, { children: [
    /* @__PURE__ */ jsx("h1", { children: "Boost Your Strapi Workflow with importing and exporting data" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("h2", { children: "Suppoted Strapi version: 5+" }),
    /* @__PURE__ */ jsx("h2", { children: "Suppoted file extension: csv" }),
    /* @__PURE__ */ jsx(ImportExport, {})
  ] });
};
const App = () => {
  return /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(HomePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(Page.Error, {}) })
  ] });
};
export {
  App
};
