import {
  AiOutlineAreaChart,
  AiOutlineBarChart,
  AiOutlineCalendar,
  AiOutlineShoppingCart,
  AiOutlineStock,
} from "react-icons/ai";
import { BiColorFill } from "react-icons/bi";
import { BsBarChart, BsKanban } from "react-icons/bs";
import { FiEdit, FiPieChart, FiShoppingBag } from "react-icons/fi";
import { GiLouvrePyramid } from "react-icons/gi";
import { IoMdContacts } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { RiContactsLine, RiStockLine } from "react-icons/ri";

export const links = [
  {
    title: "Panel de Control",
    links: [
      {
        name: "Inicio",
        path: "Inicio",
        icon: <IoHomeOutline />,
      },
      {
        name: "Todos los Productos",
        path: "TodosProductos",
        icon: <FiShoppingBag />,
      },
      {
        name: "Solicitudes de Vendedores",
        path: "SolicitudesVendedores",
        icon: <FiShoppingBag />,
      },
    ],
  },
  {
    title: "Paginas",
    links: [
      {
        name: "Pedidos",
        path: "Pedidos",
        icon: <AiOutlineShoppingCart />,
      },
      {
        name: "Empleados",
        path: "Empleados",
        icon: <IoMdContacts />,
      },
      {
        name: "Clientes",
        path: "Clientes",
        icon: <RiContactsLine />,
      },
    ],
  },
  {
    title: "Aplicaciones",
    links: [
      {
        name: "Calendario",
        path: "Calendario",
        icon: <AiOutlineCalendar />,
      },
      {
        name: "Tablero",
        path: "Tablero",
        icon: <BsKanban />,
      },
      {
        name: "Editor",
        path: "Editor",
        icon: <FiEdit />,
      },
      {
        name: "Selector de Colores",
        path: "SelectorColores",
        icon: <BiColorFill />,
      },
    ],
  },
  {
    title: "Graficos",
    links: [
      {
        name: "Linea",
        path: "Linea",
        icon: <AiOutlineStock />,
      },
      {
        name: "Area",
        path: "Area",
        icon: <AiOutlineAreaChart />,
      },
      {
        name: "Barras",
        path: "Barras",
        icon: <AiOutlineBarChart />,
      },
      {
        name: "Circular",
        path: "Circular",
        icon: <FiPieChart />,
      },
      {
        name: "Financiero",
        path: "Financiero",
        icon: <RiStockLine />,
      },
      {
        name: "Mapa de Colores",
        path: "MapaColores",
        icon: <BsBarChart />,
      },
      {
        name: "Piramide",
        path: "Piramide",
        icon: <GiLouvrePyramid />,
      },
      {
        name: "Apilado",
        path: "Apilado",
        icon: <AiOutlineBarChart />,
      },
    ],
  },
];
