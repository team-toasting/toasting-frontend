"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Input from "../ui/Input";
import { signIn } from "next-auth/react";

interface HeaderProps {
  isPostHeader?: boolean;
  isProfileHeader?: boolean;
  withSearch?: boolean;
}

const Header = ({
  isPostHeader = false,
  isProfileHeader = false,
  withSearch = false,
}: HeaderProps) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // 현재 창 닫기
  const handleClose = () => {
    window.close();
  };

  const onClickGoogleSignIn = async () => {
    await signIn("google", {
      redirect: true,
      callbackUrl: "/",
    });
  };

  // const onClickSignOut = async () => {
  //   await signOut();
  // };

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-gray-50">
      {/* 왼쪽 요소: 로고와 input */}
      <div className="flex items-center gap-4 flex-1 basis-1/2 pr-4">
        {(withSearch || isPostHeader || isProfileHeader) && (
          <Link href={"/"}>
            <Image src={"/logo/logo.svg"} width={105} height={48} alt="로고" />
          </Link>
        )}
        {/* 검색 input이 있을 경우 */}
        {withSearch && (
          <Input
            height="h-[48px]"
            width="w-[700px]"
            placeholder="검색어를 입력해주세요"
          />
        )}
      </div>

      {/* 오른쪽 요소 */}
      <div className="flex justify-end items-center flex-1 basis-1/2 space-x-8 text-[#76787F] relative">
        {/* 피드, 메시지, 알림 */}
        {!isPostHeader && (
          <>
            <div className="flex flex-col items-center">
              <Image
                src={"/layout/feed.svg"}
                width={24}
                height={24}
                alt="피드"
              />
              <span>피드</span>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src={"/layout/message.svg"}
                width={24}
                height={24}
                alt="메시지"
              />
              <span>메시지</span>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src={"/layout/notice.svg"}
                width={24}
                height={24}
                alt="알림"
              />
              <span>알림</span>
            </div>

            {/* 프로필 드롭다운 */}
            <div className="relative">
              <button
                className="flex flex-col items-center"
                onClick={() => setIsProfileMenuOpen((prev) => !prev)}
              >
                <Image
                  src={"/layout/profile.svg"}
                  width={24}
                  height={24}
                  alt="프로필"
                />
                <span>프로필</span>
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-[12px] p-2 border border-gray-200">
                  <Link
                    href={"/profile"}
                    className="block px-4 py-2 hover:bg-gray-100 rounded-[7px]"
                  >
                    내 프로필
                  </Link>
                  <div className="w-full block px-4 py-2 hover:bg-gray-100 rounded-[7px]">
                    설정
                  </div>
                  <div className="w-full block px-4 py-2 hover:bg-gray-100 rounded-[7px]">
                    글쓰기
                  </div>
                  {/* ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅ */}
                  <div>
                    {/* {isSession && (
                      <button onClick={onClickSignOut}>로그아웃</button>
                    )}

                    {!isSession && ( */}
                    <div
                      className="w-full block px-4 py-2 hover:bg-gray-100 rounded-[7px]"
                      onClick={onClickGoogleSignIn}
                    >
                      로그인
                    </div>
                    {/* )} */}
                  </div>
                  {/* ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅ */}
                </div>
              )}
            </div>
          </>
        )}

        {/* PostHeader일 때 닫기 버튼 추가 */}
        {isPostHeader && (
          <Image
            src={"/icon/close-btn.svg"}
            width={30}
            height={30}
            alt="닫기"
            className="cursor-pointer"
            onClick={handleClose}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
