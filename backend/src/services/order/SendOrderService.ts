import prismaClient from "../../prisma";

interface OrderRequest {
    order_id: string;
}

class SendOrderService {
    async execute({ order_id }: OrderRequest) {
        const order = await prismaClient.order.update({
            where: {
                id: order_id,
            },
            data: {
                draft: false,
            },
            select: {
                id: true,
                table: true,
                status: true,
                draft: true,
                name: true,
            }
        });

        return order;
    }
}

export { SendOrderService };