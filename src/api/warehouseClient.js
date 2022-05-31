import axiosClient from './axiosClient';

const warehouseApi = {
    //deleteGoodsCheck, deleteGoodsTransfer
    createWarehouse: async (currentWarehouse) => {
        try {
            const { data } = await axiosClient.post(`/warehouse`, currentWarehouse);
            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },
    deleteGoodsCheck: async (id) => {
        try {
            const { data } = await axiosClient.delete(`/warehouse/add-goods-check/${id}`);
            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },
    deleteGoodsTransfer: async (id) => {
        try {
            const { data } = await axiosClient.delete(`/warehouse/add-goods-transfer/${id}`);
            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },
    updateWarehouse: async (currentWarehouse) => {
        try {
            const { data } = await axiosClient.patch(`/warehouse/${currentWarehouse.id}`, currentWarehouse);
            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },
    deleteWarehouse: async (param) => {
        try {
            // console.log(param);
            const { data } = await axiosClient.delete(`/warehouse/${param.warehouseId}`);
            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },
    // /deleteWarehouse
    getAllWarehouse: async (param) => {
        try {
            const { data } = await axiosClient.get('/warehouse', {
                params: param,
            });
            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },
    createAddGoodsReceipt: async (params) => {
        try {
            const { data } = await axiosClient.post('/warehouse/add-goods-receipt', params);

            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    updateAddGoodsReceipt: async (params) => {
        try {
            const { data } = await axiosClient.patch(`/warehouse/add-goods-receipt/${params.id}`, params);

            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    updateAddGoodsIssue: async (params) => {
        try {
            const { data } = await axiosClient.patch(`/warehouse/add-goods-issue/${params.id}`, params);

            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    updateGoodsCheck: async (params) => {
        try {
            const { data } = await axiosClient.patch(`/warehouse/add-goods-check/${params.id}`, params);

            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    updateGoodsTransfer: async (params) => {
        try {
            const { data } = await axiosClient.patch(`/warehouse/add-goods-transfer/${params.id}`, params);

            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },
    getAllAddGoodsReceipt: async (params) => {
        try {
            const { data } = await axiosClient.get('/warehouse/add-goods-receipt', { params: params });

            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },
    getAllAddGoodsIssue: async (params) => {
        try {
            const { data } = await axiosClient.get('/warehouse/add-goods-issue', { params: params });

            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },
    getAllAddGoodsTransfer: async (params) => {
        try {
            const { data } = await axiosClient.get('/warehouse/add-goods-transfer', { params: params });

            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },
    getAllAddGoodsCheck: async (params) => {
        try {
            const { data } = await axiosClient.get('/warehouse/add-goods-check', { params: params });

            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    createAddGoodsIssue: async (params) => {
        try {
            const { data } = await axiosClient.post('/warehouse/add-goods-issue', params);

            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },
    createAddGoodsIssueOrder: async (params) => {
        try {
            const { data } = await axiosClient.post('/warehouse/add-goods-issue-of-order', params);

            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },
    exportGoods: async (params) => {
        try {
            const { data } = await axiosClient.post('/warehouse/export-goods', params);

            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    importGoods: async (params) => {
        try {
            const { data } = await axiosClient.post('/warehouse/import-goods', params);

            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    createAddGoodsCheck: async (params) => {
        try {
            const { data } = await axiosClient.post('/warehouse/add-goods-check', params);

            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    createAddGoodsTransfer: async (params) => {
        try {
            const { data } = await axiosClient.post('/warehouse/add-goods-transfer', params);

            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    getAllWayBill: async (params) => {
        try {
            const { data } = await axiosClient.get('warehouse/get-all-way-bill', { params: params });

            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },
    handleShip: async (params) => {
        try {
            const { data } = await axiosClient.post('warehouse/handle-ship-by-shipper', params);

            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    deleteGoodsIssue: async (goodIssueId) => {
        try {
            const { data } = await axiosClient.delete(`warehouse/add-goods-issue/${goodIssueId}`);

            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    deleteGoodsReceipt: async (goodReceiptId) => {
        try {
            const { data } = await axiosClient.delete(`warehouse/add-goods-receipt/${goodReceiptId}`);

            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    checkQuantityStockOrder: async (params) => {
        try {
            const { data } = await axiosClient.post(`warehouse/check-quantity-stock-order`, params);

            return data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    getAddGoodsReceipt: async (params) => {
        try {
            const { data } = await axiosClient.post(`warehouse/get-add-goods-receipt`, params);

            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    getAddGoodsIssue: async (params) => {
        try {
            const { data } = await axiosClient.post(`warehouse/get-add-goods-issue`, params);

            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    getWarehouseContainUnit: async (params) => {
        try {
            const { data } = await axiosClient.get(`warehouse/get-warehouse-contain-unit`, {
                params,
            });

            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    getInfoOfUnitInWarehouse: async (params) => {
        try {
            const { data } = await axiosClient.get(`warehouse/get-info-of-unit-in-warehouse`, {
                params: params,
            });

            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },

    overviewReportWarehouse: async (params) => {
        try {
            const { data } = await axiosClient.post(`warehouse/overview-report-warehouse`, params);

            return data.data;
        } catch (error) {
            if (error.response) throw new Error(error.response.data.message);
            else throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    },
    //overviewReportWarehouse
};

export default warehouseApi;
