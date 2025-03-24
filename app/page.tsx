"use client";

import { Resend } from 'resend';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Heart, ArrowRight, ArrowLeft, Flower, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { sendEmail } from '@/lib/resend';




type FormData = {
  partnerNames: string;
  weddingDate: Date;
  venueLocation: string;
  venueType: "indoor" | "outdoor" | "both";
  guestCount: string;
  email: string;
  phone: string;
  privacyPolicy: boolean;
};

const locations = [
  "Málaga-Centro Histórico",
  "Málaga Capital",
  "Marbella",
  "Churriana",
  "Mijas",
  "Estepona",
  "Antequera",
  "Torremolinos",
  "Benalmádena",
  "otro"
];

const guestRanges = [
  "0-50",
  "51-100",
  "101-150",
  "151-200",
  "201-250",
  "251-300",
  "Más de 300"
];

export default function Home() {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date>();
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<"es" | "en">("es");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>();
  const privacyPolicyAccepted = watch("privacyPolicy"); // Monitorea el valor de privacyPolicy

  const onSubmit = async (data: FormData) => {
    if (!privacyPolicyAccepted) {
      toast.error(
        language === "es"
          ? "Debe aceptar la política de privacidad antes de enviar."
          : "You must accept the privacy policy before submitting."
      );
      return; // Detiene el envío del formulario
    }
    try {
      setLoading(true);
      console.log(data)
      // const emailResponse = await sendEmail(data);
      // console.log(emailResponse)
      setLoading(false);

      toast.success(
        language === "es"
          ? "¡Solicitud enviada con éxito! Revisa tu correo electrónico."
          : "Request sent successfully! Check your email."
      );
    } catch (error) {
      toast.error(
        language === "es"
          ? "Error al enviar la solicitud. Por favor, intenta de nuevo."
          : "Error sending request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const texts = {
    title: {
      es: "¡Tu boda soñada empieza aquí!",
      en: "Your dream wedding starts here!"
    },
    subtitle: {
      es: 'Diseñamos momentos mágicos mientras tú solo piensas en decir "sí, quiero".',
      en: "We design magical moments while you focus on saying 'I do'."
    },
    uniqueDay: {
      es: "🕊 Un día único merece una planificación impecable.",
      en: "🕊 A unique day deserves impeccable planning."
    },
    uniqueDayDesc: {
      es: "En Altamirano Floristas, nos encargamos de todo para que vivas el mejor día de tu vida sin preocupaciones. Desde el diseño de los rincones más especiales hasta la coordinación del último baile, estaremos a tu lado para que cada detalle sea perfecto.",
      en: "At Altamirano Floristas, we take care of everything so you can live the best day of your life without worries. From designing the most special corners to coordinating the last dance, we'll be by your side to make every detail perfect."
    },
    unforgettableMoments: {
      es: "✨ Momentos inolvidables, diseñados solo para ti.",
      en: "✨ Unforgettable moments, designed just for you."
    },
    unforgettableMomentsDesc: {
      es: "Imagina caminar hacia el altar con la decoración que siempre soñaste, invitados sorprendidos por cada detalle y todo fluyendo como si fuera magia. Tú relájate, ríe y baila; nosotros hacemos que todo ocurra a la perfección.",
      en: "Imagine walking down the aisle with the decoration you've always dreamed of, guests surprised by every detail, and everything flowing as if by magic. You relax, laugh, and dance; we make everything happen perfectly."
    },
    stressFree: {
      es: "🎉 La boda que siempre imaginaste, sin estrés.",
      en: "🎉 The wedding you've always imagined, stress-free."
    },
    stressFreeDesc: {
      es: "Con nuestro servicio de organización integral, gestionamos a los mejores proveedores, diseñamos la estética del evento y estamos contigo en cada paso del camino. Además, garantizamos que tú y tus invitados se lo pasarán en grande. ¡Cero preocupaciones, solo felicidad!",
      en: "With our comprehensive organization service, we manage the best vendors, design the event's aesthetics, and are with you every step of the way. Plus, we guarantee that you and your guests will have a great time. Zero worries, just happiness!"
    },
    formIntro: {
      es: "💌 Este formulario es el primer paso hacia la boda perfecta.",
      en: "💌 This form is the first step towards the perfect wedding."
    },
    formIntroDesc: {
      es: "No dejes que la planificación te agobie, nosotros lo hacemos fácil, divertido y muy especial.",
      en: "Don't let planning overwhelm you, we make it easy, fun, and very special."
    },
    names: {
      es: "¿Cómo os llamáis?",
      en: "What are your names?"
    },
    namesPlaceholder: {
      es: "ej., María & Juan",
      en: "e.g., Emma & James"
    },
    namesError: {
      es: "Por favor ingrese ambos nombres",
      en: "Please enter both names"
    },
    date: {
      es: "¿Cuándo es su día especial?",
      en: "When is your special day?"
    },
    venue: {
      es: "¿Dónde será su celebración?",
      en: "Where will your celebration take place?"
    },
    location: {
      es: "Seleccione la ubicación",
      en: "Select location"
    },
    venueType: {
      es: "Tipo de Lugar",
      en: "Venue Type"
    },
    indoor: {
      es: "Interior",
      en: "Indoor"
    },
    outdoor: {
      es: "Exterior",
      en: "Outdoor"
    },
    both: {
      es: "Ambos",
      en: "Both"
    },
    guests: {
      es: "¿Cuántos invitados aproximadamente asistirán?",
      en: "Approximately how many guests will attend?"
    },
    guestsSelect: {
      es: "Seleccione el rango de invitados",
      en: "Select guest range"
    },
    email: {
      es: "Correo electrónico",
      en: "Email address"
    },
    emailError: {
      es: "Por favor ingrese un correo electrónico válido",
      en: "Please enter a valid email address"
    },
    phone: {
      es: "Número de teléfono",
      en: "Phone number"
    },
    phoneError: {
      es: "Por favor ingrese un número de teléfono",
      en: "Please enter a phone number"
    },
    privacy: {
      es: "Acepto la política de privacidad y términos de servicio",
      en: "I agree to the privacy policy and terms of service"
    },
    privacyError: {
      es: "Debe aceptar la política de privacidad",
      en: "You must accept the privacy policy"
    },
    previous: {
      es: "Anterior",
      en: "Previous"
    },
    next: {
      es: "Siguiente",
      en: "Next"
    },
    submit: {
      es: "Enviar",
      en: "Submit"
    },
    sending: {
      es: "Enviando...",
      en: "Sending..."
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none h-screen md:h-auto"
      // style={{
      //   backgroundImage: "url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3')"
      // }}
      />

      <div className="max-w-4xl mx-auto px-4 py-12 relative">
        <div className="absolute top-4 right-4 space-x-2">
          <button
            onClick={() => setLanguage("es")}
            className={cn(
              "px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200",
              language === "es" ? "bg-[#A4B4A4] text-white" : "bg-white/80 hover:bg-[#A4B4A4]/20"
            )}
          >
            ES
          </button>
          <button
            onClick={() => setLanguage("en")}
            className={cn(
              "px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200",
              language === "en" ? "bg-[#A4B4A4] text-white" : "bg-white/80 hover:bg-[#A4B4A4]/20"
            )}
          >
            EN
          </button>
        </div>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
          </div>
          <h1 className="text-4xl font-serif text-[#4A4A4A] mb-4 font-light">
            {texts.title[language]}
          </h1>
          <p className="text-lg text-[#6B6B6B] font-light mb-12">
            {texts.subtitle[language]}
          </p>

          <div className="space-y-8 text-left mb-12">
            <div>
              <h2 className="text-xl font-serif text-[#4A4A4A] mb-2">
                {texts.uniqueDay[language]}
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed">
                {texts.uniqueDayDesc[language]}
              </p>
            </div>


            <div>
              <h2 className="text-xl font-serif text-[#4A4A4A] mb-2">
                {texts.formIntro[language]}
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed">
                {texts.formIntroDesc[language]}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg p-8 mb-8">
          <form onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Evita el envío del formulario por defecto
              if (step < 5) {
                nextStep(); // Avanza al siguiente paso si no es el último
              } else {
                handleSubmit(onSubmit)(); // Envía el formulario si es el último paso
              }
            }
          }} className="space-y-8">

            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <Label
                  htmlFor="partnerNames"
                  className="text-lg text-[#4A4A4A] font-light"
                >
                  {texts.names[language]}
                </Label>
                <Input
                  id="partnerNames"
                  placeholder={texts.namesPlaceholder[language]}
                  {...register("partnerNames", { required: true })}
                  className="border-[#E8E8E8] focus:ring-[#A4B4A4] focus:border-[#A4B4A4] rounded-xl py-3 text-lg"
                />
                {errors.partnerNames && (
                  <p className="text-[#D64545] text-sm">
                    {texts.namesError[language]}
                  </p>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <Label className="text-lg text-[#4A4A4A] font-light">
                  {texts.date[language]}
                </Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    setDate(selectedDate); // Actualiza el estado local
                    setValue("weddingDate", selectedDate); // Registra la fecha en react-hook-form
                  }}
                  className="rounded-xl border-[#E8E8E8] mx-auto"
                  classNames={{
                    day_selected: "bg-[#A4B4A4] text-white hover:bg-[#8A9B8A]",
                    day_today: "bg-[#F3F3F3] text-[#4A4A4A]",
                  }}
                  disabled={(date) => date < new Date()}
                  locale={language === "es" ? es : undefined}
                />
              </div>
            )}
            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="space-y-4">
                  <Label className="text-lg text-[#4A4A4A] font-light">
                    {texts.venue[language]}
                  </Label>
                  <Select onValueChange={(value) => setValue('venueLocation', value)}>
                    <SelectTrigger className="border-[#E8E8E8] focus:ring-[#A4B4A4] focus:border-[#A4B4A4] rounded-xl py-3 text-lg">
                      <SelectValue placeholder={texts.location[language]} />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label className="text-lg text-[#4A4A4A] font-light">
                    {texts.venueType[language]}
                  </Label>
                  <RadioGroup
                    defaultValue="indoor"
                    {...register("venueType", { required: true })} // Registrar venueType
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="indoor" id="indoor" className="text-[#A4B4A4]" />
                      <Label htmlFor="indoor" className="text-[#4A4A4A]">{texts.indoor[language]}</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="outdoor" id="outdoor" className="text-[#A4B4A4]" />
                      <Label htmlFor="outdoor" className="text-[#4A4A4A]">{texts.outdoor[language]}</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="both" id="both" className="text-[#A4B4A4]" />
                      <Label htmlFor="both" className="text-[#4A4A4A]">{texts.both[language]}</Label>
                    </div>
                  </RadioGroup>
                  {errors.venueType && (
                    <p className="text-[#D64545] text-sm">
                      {texts.namesError[language]}
                    </p>
                  )}
                </div>
              </div>
            )}


            {step === 4 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="space-y-4">
                  <Label className="text-lg text-[#4A4A4A] font-light">
                    {texts.guests[language]}
                  </Label>
                  <Select onValueChange={(value) => setValue('guestCount', value)}>
                    <SelectTrigger className="border-[#E8E8E8] focus:ring-[#A4B4A4] focus:border-[#A4B4A4] rounded-xl py-3 text-lg">
                      <SelectValue placeholder={texts.guestsSelect[language]} />
                    </SelectTrigger>
                    <SelectContent>
                      {guestRanges.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            

            {step === 5 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="space-y-4">
                  <Label
                    htmlFor="email"
                    className="text-lg text-[#4A4A4A] font-light"
                  >
                    {texts.email[language]}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    })}
                    className="border-[#E8E8E8] focus:ring-[#A4B4A4] focus:border-[#A4B4A4] rounded-xl py-3 text-lg"
                  />
                  {errors.email && (
                    <p className="text-[#D64545] text-sm">
                      {texts.emailError[language]}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <Label
                    htmlFor="phone"
                    className="text-lg text-[#4A4A4A] font-light"
                  >
                    {texts.phone[language]}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone", { required: true })}
                    className="border-[#E8E8E8] focus:ring-[#A4B4A4] focus:border-[#A4B4A4] rounded-xl py-3 text-lg"
                  />
                  {errors.phone && (
                    <p className="text-[#D64545] text-sm">
                      {texts.phoneError[language]}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="privacy"
                    {...register("privacyPolicy", { required: true })}
                    className="text-[#A4B4A4] border-[#E8E8E8]"
                  />
                  <Label htmlFor="privacy" className="text-sm text-[#6B6B6B]">
                    {texts.privacy[language]}
                  </Label>
                </div>
                {errors.privacyPolicy && (
                  <p className="text-[#D64545] text-sm">
                    {texts.privacyError[language]}
                  </p>
                )}
              </div>
            )}

            <div className="flex justify-between pt-8">
              {step > 1 && (
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="outline"
                  className="flex items-center border-[#A4B4A4] text-[#4A4A4A] hover:bg-[#A4B4A4]/10"
                  disabled={loading}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {texts.previous[language]}
                </Button>
              )}

              {step < 5 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto bg-[#A4B4A4] hover:bg-[#8A9B8A] text-white flex items-center rounded-full px-4 py-2 text-base sm:px-6 sm:py-3 sm:text-lg"
                  disabled={loading}
                >
                  {texts.next[language]}
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="ml-auto bg-[#A4B4A4] hover:bg-[#8A9B8A] text-white flex items-center rounded-full px-4 py-2 text-base sm:px-6 sm:py-3 sm:text-lg"
                  disabled={loading || !privacyPolicyAccepted} // Deshabilitar si no se acepta la política
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                      {texts.sending[language]}
                    </>
                  ) : (
                    <>
                      {texts.submit[language]}
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                    </>
                  )}
                </Button>
              )}
              {step === 6 && (
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-serif text-[#4A4A4A]">
                    {texts.thankYou[language]}
                  </h2>
                  <p className="text-lg text-[#6B6B6B]">
                    {texts.contactSoon[language]}
                  </p>
                  <Button
                    onClick={() => setStep(1)}
                    className="mt-4 bg-[#A4B4A4] hover:bg-[#8A9B8A] text-white px-4 py-2 rounded-lg"
                  >
                    {texts.backToStart[language]}
                  </Button>
                </div>
              )}


            </div>
          </form >
        </div >
      </div >
    </div >
  );
}