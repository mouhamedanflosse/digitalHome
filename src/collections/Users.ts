import { Access, CollectionConfig } from "payload/types";
import { VerificationEmailHtml } from "../components/email/EmailVerification";

const userOrAdmin : Access = ({req})  => {
    const user = req.user
    if (user.role === "admin") return true
    return {
        id : {
            equals : user.id
        }
    }
}

export const Users : CollectionConfig = {
    slug : "users",
    auth : true ,
    access : {
        read : userOrAdmin,
        create : () => true,
        update : ({req}) => req.user.role === "admin",
        delete : ({req}) => req.user.role === "admin", 
    },
    admin : {
        hidden : ({user}) => user.role !== "admin",
        defaultColumns : ["id"]
    },
    fields : [
        {
            name : "products",
            label : "products",
            admin : {
                condition : () => false
            },
            relationTo : "products",
            type : "relationship",
            hasMany : true,
        },
        {
            name : "product_files",
            label : "product files",
            admin : {
                condition : () => false
            },
            relationTo : "product_files",
            type : "relationship",
            hasMany : true,
        },
        {
            name : "role",
            defaultValue : "user",
            required : true,
            type : "select",
            options : [
                {label : "Admin", value : "admin"},
                {label : "User", value : "user"},
            ]
        }
    ]
}