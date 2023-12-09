import { createSlice } from "@reduxjs/toolkit";
export const cartSlice = createSlice({
    name: 'cart',
    initialState: { listSP: [], },
    reducers: {
        themSP: (state, action) => {
            const newProduct = action.payload;
            const existingProductIndex = state.listSP.findIndex(product => product._id === newProduct._id);

            if (existingProductIndex === -1) {
                // Nếu sản phẩm chưa có trong danh sách, thêm mới với số lượng là 1
                newProduct['quantity'] = 1;
                state.listSP.push(newProduct);
            } else {
                // Nếu sản phẩm đã tồn tại, tăng số lượng lên 1
                state.listSP[existingProductIndex]['quantity']++;
            }

            console.log("Đã thêm sản phẩm. Số lượng sản phẩm =", state.listSP.length);
        },
        suaSL: (state, param) => {
            let id_sp = param.payload[0];
            let soluong = param.payload[1];
            console.log("Giá trị mới của quantity:", soluong); // Thêm dòng này để log giá trị mới của quantity
            let index = state.listSP.findIndex(s => s._id === id_sp);
            if (index !== -1) state.listSP[index].quantity = Number(soluong);
            // console.log(state.listSP[index]);
        },
        xoaSP: (state, param) => {
            let _id = param.payload;
            const index = state.listSP.findIndex(s => s._id === _id);
            if (index !== -1) state.listSP.splice(index, 1);
        },
        xoaGH: state => { state.listSP = []; }
    }
});
export const { themSP, suaSL, xoaSP, xoaGH } = cartSlice.actions
export default cartSlice.reducer;