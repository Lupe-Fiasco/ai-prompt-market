'use client'
import { useEffect, useState } from "react";
import { Divider, Pagination } from "@nextui-org/react";
import { User } from "@clerk/nextjs/server";
import { useRouter } from "next/navigation";
import ShopBanner from "@/components/Shop/ShopBanner";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";

import FilterPrompt from "@/components/Prompts/FilterPrompt";
import PromptCard from "@/components/Prompts/PromptCard";
import PromptCardLoader from "@/components/Prompts/PromptCardLoader";

export default function MarketPlace({
    user,
    isSellerExist,
}: {
    user: User | undefined;
    isSellerExist: boolean;
}) {
    const [isMounted, setisMounted] = useState(false);
    const [initialPage, setInitialPage] = useState(1);
    const [prompts, setPrompts] = useState<any>();
    const [totalPrompts, setTotalPrompts] = useState<any>();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!isMounted) {
            setisMounted(true);
        }
    }, [isMounted]);

    useEffect(() => {
        if (initialPage) {
            router.push(`/marketplace?page=${initialPage}`);
        }
    }, [initialPage, router]);

    useEffect(() => {
        const fetchPromptsData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/get-prompts?page=${initialPage}`);
                const data = await response.json();
                setPrompts(data.prompts);
                setTotalPrompts(data.totalPrompts);

            } catch (error) {
                console.error("Failed to fetch prompts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPromptsData();
    }, [initialPage]);

    if (!isMounted) {
        return null;
    }

    const paginationsPages = totalPrompts && Math.ceil(totalPrompts.length / 9);

    return (
        <>
            <div className="shop-banner">
                <Header activeItem={2} user={user} isSellerExist={isSellerExist} />
                <ShopBanner title="Our Shop" />
            </div>
            <div>
                <div className="w-[95%] md:w-[90%] xl:w-[85%] 2xl:w-[80%] m-auto">
                    <div>
                        <div className="w-full">
                            <FilterPrompt
                                setPrompts={setPrompts}
                                totalPrompts={totalPrompts}
                            />
                        </div>
                        <div className="w-full flex flex-wrap mt-5">
                            {loading ? (
                                [...new Array(9)].map((i) => (
                                    <>
                                        <PromptCardLoader />
                                    </>
                                ))
                            ) : (
                                <>
                                    {prompts &&
                                        prompts.map((item: any) => (
                                            <PromptCard prompt={item} key={item.id} />
                                        ))}
                                </>
                            )}
                        </div>
                        <div className="w-full flex items-center justify-center mt-5">
                            {!loading && (
                                <Pagination
                                    loop
                                    showControls
                                    total={paginationsPages}
                                    initialPage={initialPage}
                                    classNames={{
                                        wrapper: "mx-2",
                                        item: "mx-2",
                                    }}
                                    onChange={setInitialPage}
                                />
                            )}
                        </div>
                        <Divider className="bg-[#ffffff14] mt-5" />
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
};

