import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {

    getPagination(page: number, limit: number,totalItems:number) {
        const totalPages = Math.ceil(totalItems / limit);

        return {
            page,
            limit,
            totalPages
        };
    }
}
