const OpenApiObj = {
    "openapi": "3.0.0",
    "info": {
      "title": "DCGIS Education API",
      "description": "API to retrieve education-related data from DCGIS",
      "version": "1.0.0"
    },
    "servers": [
      {
        "url": ""
      }
    ],
    "components": {
      "parameters": {
        "whereParam": {
          "name": "where",
          "in": "query",
          "required": true,
          "schema": {
            "type": "string",
            "example": "1=1"
          }
        },
        "outSRParam": {
          "name": "outSR",
          "in": "query",
          "required": true,
          "schema": {
            "type": "integer",
            "example": 4326
          }
        },
        "fParam": {
          "name": "f",
          "in": "query",
          "required": true,
          "schema": {
            "type": "string",
            "example": "json"
          }
        }
      }
    },
    "paths": {}
  }
  ;

  const pathObj = {
        "get": {
          "summary": "test sum",
          "description": "test desc",
          "parameters": [
            {
              "$ref": "#/components/parameters/whereParam"
            },
            {
              "name": "outFields",
              "in": "query",
              "required": true,
              "schema": {
                "type": "string",
                "example": ""
              }
            },
            {
              "$ref": "#/components/parameters/outSRParam"
            },
            {
              "$ref": "#/components/parameters/fParam"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object"
                  }
                }
              }
            }
          }
        }
      };