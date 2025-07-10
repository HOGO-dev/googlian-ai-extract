import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Download, FileText, Calendar, DollarSign, Building, Hash, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BoletoData {
  id: string;
  tipo: string;
  numero: string;
  sacadoCnpj: string;
  vencimento: string;
  valorFace: string;
  nomeSacado: string;
  linhaDigitavel: string;
  processedAt: Date;
  status: 'processing' | 'completed' | 'error';
}

interface BoletoResultsProps {
  boletos: BoletoData[];
}

export const BoletoResults = ({ boletos }: BoletoResultsProps) => {
  const { toast } = useToast();

  const handleDownloadExcel = () => {
    // Simulação do download de Excel - aqui você integraria com uma lib como xlsx
    toast({
      title: "Preparando download",
      description: "O arquivo Excel será baixado em breve.",
    });

    // Simular download
    setTimeout(() => {
      toast({
        title: "Download concluído!",
        description: "Os dados dos boletos foram exportados com sucesso.",
      });
    }, 2000);
  };

  const handleDownloadSingle = (boleto: BoletoData) => {
    toast({
      title: "Download iniciado",
      description: `Baixando dados do boleto ${boleto.numero}...`,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (boletos.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">Nenhum resultado disponível</h3>
          <p className="text-muted-foreground">
            Faça upload de boletos para ver os resultados aqui.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Resultados dos Boletos</h3>
          <p className="text-muted-foreground">
            {boletos.length} boleto(s) processado(s) com sucesso
          </p>
        </div>
        <Button onClick={handleDownloadExcel} size="lg">
          <Download className="h-4 w-4 mr-2" />
          Exportar para Excel
        </Button>
      </div>

      {/* Results Grid */}
      <div className="grid gap-6">
        {boletos.map((boleto, index) => (
          <Card key={boleto.id} className="overflow-hidden">
            <CardHeader className="bg-muted/30">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Boleto #{boleto.numero}</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    Processado em {formatDate(boleto.processedAt)}
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownloadSingle(boleto)}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Tipo */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
                    <Hash className="h-4 w-4" />
                    <span>TIPO</span>
                  </div>
                  <p className="text-lg font-semibold">{boleto.tipo}</p>
                </div>

                {/* Número */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
                    <Hash className="h-4 w-4" />
                    <span>NÚMERO</span>
                  </div>
                  <p className="text-lg font-semibold font-mono">{boleto.numero}</p>
                </div>

                {/* Valor */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span>VALOR FACE</span>
                  </div>
                  <p className="text-lg font-semibold text-green-600">{boleto.valorFace}</p>
                </div>

                {/* Vencimento */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>VENCIMENTO</span>
                  </div>
                  <p className="text-lg font-semibold">{boleto.vencimento}</p>
                </div>

                {/* Nome Sacado */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
                    <Building className="h-4 w-4" />
                    <span>NOME SACADO</span>
                  </div>
                  <p className="text-lg font-semibold">{boleto.nomeSacado}</p>
                </div>

                {/* CNPJ */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
                    <Building className="h-4 w-4" />
                    <span>SACADO (CNPJ)</span>
                  </div>
                  <p className="text-lg font-semibold font-mono">{boleto.sacadoCnpj}</p>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Linha Digitável */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
                  <CreditCard className="h-4 w-4" />
                  <span>LINHA DIGITÁVEL</span>
                </div>
                <div className="bg-muted/50 p-3 rounded border">
                  <p className="text-sm font-mono break-all">{boleto.linhaDigitavel}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold mb-1">Resumo do Processamento</h4>
              <p className="text-sm text-muted-foreground">
                Total de {boletos.length} boleto(s) processado(s) com sucesso
              </p>
            </div>
            <Button onClick={handleDownloadExcel} variant="default">
              <Download className="h-4 w-4 mr-2" />
              Exportar Todos
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};