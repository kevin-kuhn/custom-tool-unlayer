import React, { Component } from "react";
import "./App.css";

import EmailEditor from "react-email-editor";

class App extends Component {
  render() {
    const products = [
      {
        id: 1,
        image:
          "https://img.thriftbooks.com/api/images/i/m/B4380A756292C0D50D92213A920E5A9E6C1DD713.jpg",
        title: "The Great Believers",
        description:
          "A page turner... An absorbing and emotionally riveting story about what it's like to live during times of crisis. The New York Times Book Review A dazzling new novel of friendship and redemption in the face of tragedy and loss set in 1980s Chicago and contemporary Paris In 1985, Yale Tishman, the development director for an art gallery in Chicago, is about to pull off an amazing coup, bringing in an extraordinary collection of 1920s paintings as a gift to the gallery."
      },
      {
        id: 2,
        image:
          "https://img.thriftbooks.com/api/images/i/m/F0836F0E91E904515A5A47078C555303CCC67351.jpg",
        title: "The Hundred-Year House",
        description:
          "From the acclaimed author of The Great Believers, an original, mordantly witty novel about the secrets of an old-money family and their turn-of-the-century estate, Laurelfield. Meet the Devohrs: Zee, a Marxist literary scholar who detests her parents' wealth but nevertheless finds herself living in their carriage house; Gracie, her mother, who claims she can tell your lot in life by looking at your teeth; and Bruce, her step-father, stockpiling supplies for the Y2K apocalypse and perpetually late for his tee time. "
      }
    ];
    return (
      <EmailEditor
        projectId={1071}
        tools={{
          "custom#product_tool": {
            data: {
              products
            },
            properties: {
              productLibrary: {
                editor: {
                  data: {
                    products
                  }
                }
              }
            }
          }
        }}
        options={{
          customCSS: [
            "https://examples.unlayer.com/examples/product-library-tool/productTool.css"
          ],
          customJS: [
            window.location.protocol +
              "//" +
              window.location.host +
              "/custom.js"
          ]
        }}
      />
    );
  }
}

export default App;
