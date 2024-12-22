"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const admin = require("@strapi/strapi/admin");
const reactRouterDom = require("react-router-dom");
const designSystem = require("@strapi/design-system");
const react = require("react");
const index = require("./index-sCU6ZypY.js");
function useCollectionList() {
  const [collectionsList, setCollectionsList] = react.useState([]);
  const { get } = admin.useFetchClient();
  react.useEffect(() => {
    const fetchCollections = async () => {
      try {
        const { data } = await get(`${index.PLUGIN_ID}/get-collections-list`);
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
  const [selectedCollection, setSelectedCollection] = react.useState("");
  const [file, setFile] = react.useState(null);
  const [isLoading, setIsLoading] = react.useState(false);
  const { post } = admin.useFetchClient();
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
      const { data } = await post(`${index.PLUGIN_ID}/import-data`, formData, {
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
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Root, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { children: "Import" }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Content, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Title, { children: "Import CSV Data" }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Body, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.SingleSelect,
          {
            placeholder: "Select a collection",
            onChange: setSelectedCollection,
            value: selectedCollection,
            children: collectionsList?.map((key) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: key?.uid, children: key.name }, key?.uid))
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { marginTop: "16px", marginBottom: "16px" }, children: [
          /* @__PURE__ */ jsxRuntime.jsx("label", { htmlFor: "file-upload", style: { display: "block", marginBottom: "8px" }, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "beta", children: "Upload CSV File" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(
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
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Footer, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Close, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "tertiary", children: "Cancel" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: handleImport, disabled: isLoading, children: isLoading ? "Importing..." : "Import Data" }),
        isLoading && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Loader, {})
      ] })
    ] })
  ] }) });
};
const ExportCSV = () => {
  const { collectionsList } = useCollectionList();
  const [selectedCollection, setSelectedCollection] = react.useState("");
  const [isLoading, setIsLoading] = react.useState(false);
  const { get } = admin.useFetchClient();
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
      const { data } = await get(`${index.PLUGIN_ID}/export-data?collectionName=${selectedCollection}`);
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
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Root, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { children: "Export" }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Content, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Title, { children: "Export CSV Data" }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Body, { children: /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.SingleSelect,
        {
          placeholder: "Select a collection",
          onChange: setSelectedCollection,
          value: selectedCollection,
          children: collectionsList?.map((key) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: key?.uid, children: key.name }, key?.uid))
        }
      ) }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Footer, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Close, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "tertiary", children: "Cancel" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: () => handleExport(), disabled: isLoading, children: isLoading ? "Exporting..." : "Export Data" }),
        isLoading && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Loader, {})
      ] })
    ] })
  ] }) });
};
const ImportExport = () => {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime.jsx("br", {}),
    /* @__PURE__ */ jsxRuntime.jsx(ImportCSV, {}),
    /* @__PURE__ */ jsxRuntime.jsx(ExportCSV, {})
  ] });
};
const HomePage = () => {
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { children: [
    /* @__PURE__ */ jsxRuntime.jsx("h1", { children: "Boost Your Strapi Workflow with importing and exporting data" }),
    /* @__PURE__ */ jsxRuntime.jsx("br", {}),
    /* @__PURE__ */ jsxRuntime.jsx("h2", { children: "Suppoted Strapi version: 5+" }),
    /* @__PURE__ */ jsxRuntime.jsx("h2", { children: "Suppoted file extension: csv" }),
    /* @__PURE__ */ jsxRuntime.jsx(ImportExport, {})
  ] });
};
const App = () => {
  return /* @__PURE__ */ jsxRuntime.jsxs(reactRouterDom.Routes, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { index: true, element: /* @__PURE__ */ jsxRuntime.jsx(HomePage, {}) }),
    /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { path: "*", element: /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Error, {}) })
  ] });
};
exports.App = App;
