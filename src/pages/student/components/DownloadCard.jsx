import React, { useRef } from "react";
// import html2pdf from "html2pdf.js";
import { Button } from "@mui/material";

function DownloadCard() {
  const pdfRef = useRef();
  const user = JSON.parse(localStorage.getItem('user'))

  const generatePDF = () => {
    setTimeout(() => {
      const element = pdfRef.current;
      const opt = {
        filename: "myfile.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };
      html2pdf()
        .from(element)
        .set(opt)
        .save()
        .then(() => {});
    }, 100);
  };

  return (
    <>
      <div style={styles.container}>
        <div
          ref={pdfRef}
          id="content"
          style={{
            ...styles.content,
            display: "block",
            border: "1px solid black",
          }}
        >
          <div className="flex">
            <div className="border border-black w-72 mx-auto">
              <h1 className=" text-3xl font-bold">S M I T</h1>
              <img
                className="mt-4 w-40 mx-auto"
                src={user.image}
                alt=""
              />
              <h3 className="my-2 text-3xl font-bold">{user.name}</h3>
              <h3 className="my-2 text-2xl font-bold">Phone: @@@@@@@@@</h3>
              <h3 className="my-2 text-xl font-bold"> BATCH : 10</h3>
              <h3 className="my-2 text-xl font-bold"> Course : WMA</h3>
              <h3 className="my-2 text-xl font-bold"> CNIC : 332321232212</h3>
              {/* <div className="flex justify-center mt-4">
              <img src={data.QRCode} alt="qrcode" />
            </div> */}
            </div>
            {/* back card */}
            <div className="border border-black w-72 mx-auto p-4">
              <h1 className=" text-3xl font-bold text-center">
                S M I T
              </h1>

              <div className="flex justify-center mt-4">
                <img src={user.QRCode} alt="qrcode" className="w-24 h-24" />
              </div>

              <h3 className="text-xl font-bold text-green-700 mt-4 text-center">
                Trainer: Raja
              </h3>
              <h3 className="text-xl font-bold text-green-700 text-center">
                Timing: 7 to 9:30
              </h3>
              <h3 className="text-xl font-bold text-green-700 mt-4 text-center">
                Classes Day's
              </h3>
              <table className="table-auto w-full mt-4 text-center border-collapse border border-green-700">
                <thead>
                  <tr className="bg-green-200">
                    <th className="border border-green-700 p-2">MON</th>
                    <th className="border border-green-700 p-2">WED</th>
                    <th className="border text-green-700 border-green-700 p-2">
                      FRI
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-10 right-2">
        <Button variant="contained" onClick={generatePDF}>
          Download Card
        </Button>
      </div>
    </>
  );
}

const styles = {
  container: {
    display: "none",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "20px",
  },
  content: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    marginBottom: "20px",
    width: "100%", // Make the content take the full width
    maxWidth: "800px", // Limit the max width for better alignment
  },
  header: {
    fontSize: "24px",
    color: "#333",
  },
  paragraph: {
    fontSize: "16px",
    color: "#666",
  }
};

export default DownloadCard;
