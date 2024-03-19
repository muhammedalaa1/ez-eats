import { useEffect, useState } from "react";
import { useParse } from "../../context/parse";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useAuth } from "../../context/Auth";
import Swal from "sweetalert2";

const Home = () => {
    const { user } = useAuth();
    const Parse = useParse();
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const navigate = useNavigate();
    const parseQuery = new Parse.Query("Orders");

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            const subscribe = await parseQuery.subscribe();

            subscribe.on("create", (order: Order) => {
                setOrders((prevOrders) => [order, ...prevOrders]);
                console.log("created", order);
            });

            subscribe.on("update", (newOrder: Order) => {
                setOrders((prevOrders) =>
                    prevOrders.map((item) =>
                        item.id === newOrder.id ? newOrder : item
                    )
                );
            });

            subscribe.on("delete", (deletedOrder: Order) => {
                setOrders((prevOrders) =>
                    prevOrders.filter((order) => order.id !== deletedOrder.id)
                );
            });

            const data = await parseQuery.findAll();
            setOrders(data);
            setLoading(false);
        };

        fetchOrders();
    }, []);

    const handleDelete = async (order: Order) => {
        if (user?.id !== order.attributes.userId) {
            Swal.fire({
                icon: "error",
                title: "Action Denied",
                text: "You cannot delete this order because it does not belong to you.",
            });
        } else {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            });

            if (result.isConfirmed) {
                try {
                    const query = new Parse.Query("Orders");
                    const object = await query.get(order.id);
                    await object.destroy();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your order has been deleted.",
                        icon: "success",
                    });
                    setOrders((prevOrders) =>
                        prevOrders.filter(
                            (prevOrder) => prevOrder.id !== order.id
                        )
                    );
                } catch (error) {
                    console.log(error);

                    Swal.fire({
                        title: "Error",
                        text: "An error occurred while deleting the order.",
                        icon: "error",
                    });
                }
            }
        }
    };
    const handleUpdate = (order: Order) => {
        if (user?.id !== order.attributes.userId) {
            Swal.fire({
                icon: "error",
                title: "Action Denied",
                text: "You cannot Edit this order because it does not belong to you.",
            });
        } else {
            navigate(`/orders/${order.id}`);
        }
    };

    return (
        <>
            {loading ? (
                <div className="h-screen w-full flex justify-center items-center">
                    <ClipLoader loading={loading} />
                </div>
            ) : (
                <div className="container mt-12 font-sans">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="border-gray-400 border flex flex-col p-4 rounded-lg max-h-96"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-2xl font-medium ">
                                        {order.attributes.orderName}
                                    </h2>
                                    <h4 className="font-semibold text-mainColor">
                                        EGP {order.attributes.Price.toFixed(2)}
                                    </h4>
                                </div>
                                <div className="h-full">
                                    <h3 className="text-lg font-medium">
                                        {order.attributes.orderDetails}
                                    </h3>
                                    <h4 className="font-medium text-gray-500">
                                        Added By: {order.attributes.userName}
                                    </h4>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleUpdate(order)}
                                        className="w-1/2 bg-mainColor border-2 loginBtn border-mainColor hover:bg-white hover:text-mainColor/90 text-white rounded-md duration-300 transition-colors p-2  mt-4 "
                                    >
                                        Update
                                    </button>

                                    <button
                                        onClick={() => handleDelete(order)}
                                        className="w-1/2 bg-black border-2 loginBtn border-black hover:bg-white hover:text-black text-white rounded-md duration-300 transition-colors p-2 mt-4 "
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;
