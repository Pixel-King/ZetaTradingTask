import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const treeName = "%7BC9232B85-AD10-459C-A44F-70CA30C60E5F%7D";

export const swaggerApi = createApi({
  reducerPath: "swagger/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://test.vmarmysh.com",
  }),
  tagTypes: ["Tree"],
  endpoints: (build) => ({
    getTree: build.query({
      query: () => ({
        url: "/api.user.tree.get",
        params: {
          treeName: treeName,
        },
      }),
      providesTags: ["Tree"],
    }),
    addNode: build.mutation({
      query: ({ parentNodeId, nodeName }) => ({
        url: "/api.user.tree.node.create",
        method: "POST",
        params: {
          treeName: treeName,
          parentNodeId: parentNodeId,
          nodeName: nodeName,
        },
      }),
      invalidatesTags: ["Tree"],
    }),
    deleteNode: build.mutation({
      query: (nodeId) => ({
        url: "/api.user.tree.node.delete",
        params: {
          treeName: treeName,
          nodeId: nodeId,
        },
      }),
      invalidatesTags: ["Tree"],
    }),
    renameNode: build.mutation({
      query: ({ nodeId , newNodeName}) => ({
        url: "/api.user.tree.node.rename",
        params: {
          treeName: treeName,
          nodeId: nodeId ,
          newNodeName: newNodeName,
        },
      }),
      invalidatesTags: ["Tree"],
    }),
  }),
});

export const { useGetTreeQuery, useAddNodeMutation, useRenameNodeMutation, useDeleteNodeMutation } = swaggerApi;
