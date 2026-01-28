import en from "./en.json";
import ar from "./ar.json";
import fr from "./fr.json";
import es from "./es.json";
import de from "./de.json";
import it from "./it.json";
import pt from "./pt.json";
import nl from "./nl.json";
import ru from "./ru.json";
import zh from "./zh.json";
import ja from "./ja.json";
import ko from "./ko.json";
import tr from "./tr.json";
import pl from "./pl.json";
import hi from "./hi.json";
import bn from "./bn.json";
import id from "./id.json";
import ms from "./ms.json";
import th from "./th.json";
import vi from "./vi.json";
import sw from "./sw.json";
import ur from "./ur.json";

export const translations: Record<string, Record<string, string>> = {
    en, ar, fr, es, de, it, pt, nl, ru, zh, ja, ko, tr, pl, hi, bn, id, ms, th, vi, sw, ur
};

export function getTranslation(lang: string, key: string): string {
    return translations[lang]?.[key] || translations["en"][key] || key;
}
