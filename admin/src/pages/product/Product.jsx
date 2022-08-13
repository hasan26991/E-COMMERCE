import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import { Publish } from "@material-ui/icons";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { useSelector } from 'react-redux'

export default function Product() {
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const [pStats, setPStats] = useState([])

    const product = useSelector(state =>
        state.product.products.find((product) => product._id === id)
    );

    const MONTHS = useMemo(() => [
        'jan',
        'feb',
        'mar',
        'april',
        'may',
        'june',
        'july',
        'aug',
        'sep',
        'oct',
        'nov',
        'dec'
    ], []);

    useEffect(() => {
        const getPStats = async () => {
            try {
                const res = await userRequest.get(`orders/income?pid=${id}`);
                const resSort = res.data.sort((a, b) => a._id - b._id);
                resSort.map(r => (
                    setPStats(prev => [
                        ...prev,
                        { name: MONTHS[r._id - 1], Sales: r.total }
                    ])
                ))
            } catch (error) { }
        }
        getPStats();
    }, [id, MONTHS])

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product?.img} alt="" className="productInfoImg" />
                        <span className="productName">{product?.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{product?._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">sales:</span>
                            <span className="productInfoValue">{product?.price}</span>
                        </div>

                        <div className="productInfoItem">
                            <span className="productInfoKey">in stock:</span>
                            <span className="productInfoValue">{product?.inStock.toString()}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Product Name</label>
                        <input type="text" placeholder={product?.title} />
                        <label>Product Desc</label>
                        <input type="text" placeholder={product?.desc} />
                        <label>Price</label>
                        <input type="text" placeholder={product?.price} />
                        <label>In Stock</label>
                        <select name="inStock" id="idStock">
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={product?.img} alt='' className='productUploadImg' />
                            <label for="file">
                                <Publish />
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} />
                        </div>
                        <button className="productButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
