import { fetchSetting } from "@/lib/nezha-api"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import { useTranslation } from "react-i18next"

const Footer: React.FC = () => {
  const { t } = useTranslation()

  const { data: settingData } = useQuery({
    queryKey: ["setting"],
    queryFn: () => fetchSetting(),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })

  return (
    <footer className="mx-auto w-full max-w-5xl px-4 lg:px-0 pb-4">
      <section className="flex flex-col">
        <section className="mt-1 flex items-center sm:flex-row flex-col justify-between gap-2 text-[13px] font-light tracking-tight text-neutral-600/50 dark:text-neutral-300/50">
          <div className="flex items-center gap-1">
            &copy;2020-{new Date().getFullYear()}{" "}
            <a href={"https://github.com/naiba/nezha"} target="_blank">
              Nezha
            </a>
            <p>{settingData?.data?.version || ""}</p>
          </div>
          <p>
            {t("footer.themeBy")}
            <a href={"https://github.com/hamster1963/nezha-dash"} target="_blank">
              nezha-dash
            </a>
            {import.meta.env.VITE_GIT_HASH && (
              <span className="ml-1">({import.meta.env.VITE_GIT_HASH})</span>
            )}
          </p>
        </section>
      </section>
    </footer>
  )
}

export default Footer
