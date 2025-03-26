import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Iproduct } from "../../interface/product";
import { Icategory } from "../../interface/category";

const ProductByCategory = () => {
    const { id } = useParams(); // Lấy ID danh mục từ URL
    const [products, setProducts] = useState<Iproduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState<Icategory | null>(null);

    useEffect(() => {
        const fetchCategoryAndProducts = async () => {
            try {
                if (!id) return;

                // 🛑 Lấy danh sách danh mục
                const { data: categories } = await axios.get("http://localhost:3000/categorys");
                const category = categories.find((c: Icategory) => c.id === Number(id));

                if (!category) {
                    console.error("Không tìm thấy danh mục!");
                    setLoading(false);
                    return;
                }
                setCategory(category);

                // 🛑 Lấy danh sách sản phẩm
                const { data: allProducts } = await axios.get("http://localhost:3000/products");

                // 🔹 Lọc sản phẩm theo `namecategory`
                const filteredProducts = allProducts.filter((p: Iproduct) => p.categorys === category.namecategory);

                setProducts(filteredProducts);
            } catch (error) {
                console.error("Có lỗi khi lấy dữ liệu:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryAndProducts();
    }, [id]);

    if (loading) return <p>Đang tải...</p>;
    if (!category) return <p>Không tìm thấy danh mục</p>;

    return (
        <div className="product-list">
            <br />
            <h3>Danh sách sản phẩm thuộc danh mục: {category.namecategory}</h3>
            <div className="container">
                <div className="product-full">
                    {products.length === 0 ? (
                        <p>Không có sản phẩm nào trong danh mục này</p>
                    ) : (
                        products.map((item) => (
                            <div className="product" key={item.id}>
                                <Link to={`/category/product/${item.id}`}>
                                    <img src={item.image} alt={item.name} className="product-image" />
                                </Link>
                                <div className="product-info">
                                    <h5 className="product-name">{item.name}</h5>
                                    <p className="product-price">{item.price} VND</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductByCategory;
